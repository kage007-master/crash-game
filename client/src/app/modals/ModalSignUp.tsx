import { useContext, useState } from "react";
import Modal from "react-modal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignUp, setWalletConnect } from "app/store/modal.slice";
import { useGetAccountInfo, useGetIsLoggedIn } from "app/hooks/sdkDappHooks";
import Iconify from "app/components/Iconify";
import { logout } from "app/hooks/sdkDappHooks";
import { initAvatar } from "app/config/const";
import { ToastrContext } from "app/providers/ToastrProvider";
import axios from "app/components/axios";
import { setAuth } from "app/store/auth.slice";
import { getmybet } from "app/store/crash.slice";
import { AppDispatch, RootState } from "app/store";

Modal.setAppElement("body");

const ModalSignUp = () => {
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(initAvatar);
  const [name, setName] = useState("");
  const notify = useContext(ToastrContext);
  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useGetIsLoggedIn();
  const isOpen = useSelector((state: RootState) => state.modal.signUp);
  const account = useGetAccountInfo();
  useEffect(() => {
    if (name && error === "name") setError("");
    if (agree && error === "agree") setError("");
    return () => {};
  }, [name, agree]);

  const handleSignUp = async () => {
    if (!account.address) {
      setError("wallet");
      return notify.error("Please connect your wallet!");
    }
    if (!name) {
      setError("name");
      return notify.error("Username required!");
    }
    if (!agree) {
      setError("agree");
      return notify.error("Please agree to the Terms and Conditions!");
    }
    if (!avatar) return notify.error("Please select your Avatar!");
    try {
      const result = await axios.post("/auth/register", {
        address: account.address,
        name,
        avatar,
      });
      if (result && result.status === 200) {
        dispatch(setAuth(result.data));
        notify.success("Sign Up Successfully!");
        notify.success("Login Successfully!");
        dispatch(setSignUp(false));
        dispatch(getmybet());
        setName("");
        setAgree(false);
        setError("");
        setAvatar(initAvatar);
      }
    } catch (errors: any) {
      console.log(errors);
      if (errors.response.status === 400)
        notify.error(errors.response.data.errors[0].msg);
      else notify.error("Server Error!");
    }
  };
  return (
    <Modal
      id="modalAuth"
      isOpen={isOpen}
      onRequestClose={() => {
        dispatch(setSignUp(false));
        if (isLogin) {
          logout();
          notify.warning("Wallet Disconnected");
        }
        setName("");
        setAgree(false);
        setError("");
        setAvatar(initAvatar);
      }}
      className="modal-fade modal-content text-sm md:text-base"
      overlayClassName="bg-[rgba(14,18,36,.7)] fixed w-full h-full top-0 left-0 backdrop-blur-xl z-50"
      contentLabel="Sign Up"
    >
      <div className="flex justify-between items-start">
        <h1 className="text-xl md:text-4xl text-white mt-3 uppercase font-semibold">
          Sign Up
        </h1>
        <div
          onClick={() => {
            dispatch(setSignUp(false));
            if (isLogin) {
              logout();
              notify.warning("Wallet Disconnected");
            }
            setName("");
            setAgree(false);
            setError("");
            setAvatar(initAvatar);
          }}
          className="text-3xl hover:text-white anim cursor-pointer"
        >
          &times;
        </div>
      </div>
      <div>
        {account.address ? (
          <div className="flex p-2.5 md:p-3 mt-4 md:mt-6 border-border rounded-md border w-full gap-2 items-center text-bright">
            <div className="m-overflow">{account.address}</div>
            <div
              onClick={() => {
                logout();
                notify.warning("Wallet Disconnected");
              }}
            >
              <Iconify
                icon="tabler:wallet-off"
                className="text-lg w-5 h-5 flex-none cursor-pointer anim text-tomato"
              ></Iconify>
            </div>
          </div>
        ) : (
          <button
            className={`w-full mt-4 md:mt-6 bg-card p-2.5 md:p-3 rounded-md hover:bg-border anim hover:text-bright ${
              error === "wallet" && "border border-tomato"
            }`}
            onClick={() => {
              dispatch(setWalletConnect(true));
            }}
          >
            Connect Wallet
          </button>
        )}
        <input
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
          className={`mt-5 p-2.5 md:p-3 rounded-md bg-transparent outline-none text-bright border-border border w-full placeholder:text-secondary focus:border-indigo anim ${
            error === "name" && "border-tomato"
          }`}
          placeholder="Username"
        ></input>
        <div className="mt-5 flex items-center justify-center">
          <div className="relative cursor-pointer">
            <img
              alt="avatar"
              src={avatar}
              className="w-24 h-24 md:w-32 md:h-32 mx-auto  border border-border rounded-full block"
            />
            <div className=" absolute text-xs rounded-full py-1 px-2 left-[70%] bottom-0 bg-card">
              0
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs md:text-sm flex items-start gap-2 md:gap-3">
          <div
            className={`flex items-center cursor-pointer ${
              error === "agree" ? "text-tomato" : "text-indigo"
            }`}
            onClick={() => {
              setAgree(!agree);
            }}
          >
            {agree ? (
              <Iconify
                icon={"mdi:shield-check"}
                className={"w-5 h-5"}
              ></Iconify>
            ) : (
              <Iconify
                icon={"mdi:shield-outline"}
                className={"w-5 h-5"}
              ></Iconify>
            )}
          </div>
          <div>
            I agree to the{" "}
            <a
              className="text-indigo hover:text-indigoBright font-semibold"
              href="/"
            >
              Terms and conditions
            </a>{" "}
            & confirm I am at least 18 years old
          </div>
        </div>
        <button
          onClick={handleSignUp}
          className="w-full mt-5 bg-gradient-to-r from-[#5E5BF8] via-[#9750F3] to-[#57A9F4] py-2.5 md:py-3 rounded-md text-white hover:shadow-[0_0_12px_0px_#818cf850] anim"
        >
          Sign Up
        </button>
      </div>
    </Modal>
  );
};

export default ModalSignUp;
