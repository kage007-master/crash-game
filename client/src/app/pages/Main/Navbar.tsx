import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setMenu,
  setChat,
  setSignUp,
  setWalletConnect,
} from "app/store/modal.slice";
import Iconify from "app/components/Iconify";
import { ReactComponent as Chat2 } from "app/assets/svg/Chat2.svg";
import {
  useGetAccountInfo,
  useGetIsLoggedIn,
  logout,
} from "app/hooks/sdkDappHooks";
import axios from "axios";
import { setAuth, setLogout } from "app/store/auth.slice";
import { ToastrContext } from "app/providers/ToastrProvider";
import Dropdown from "app/components/Dropdown";
import { getmybet } from "app/store/crash.slice";
import { AppDispatch, RootState } from "app/store";

const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const signUp = useSelector((state: RootState) => state.modal.signUp);
  const account = useGetAccountInfo();
  const isLogin = useGetIsLoggedIn();
  const dispatch = useDispatch<AppDispatch>();
  const notify = useContext(ToastrContext);

  const handleLogin = async () => {
    if (!account.address) return;
    try {
      const result = await axios.post("/auth/login", {
        address: account.address,
      });
      if (result && result.status === 200) {
        dispatch(setAuth(result.data));
        dispatch(getmybet());
        notify.success("Login Successfully!");
      }
    } catch (errors: any) {
      console.log(errors);
      if (errors.response.status === 400)
        notify.error(errors.response.data.errors[0].msg);
      else notify.error("Server Error!");
      logout();
      notify.warning("Wallert Disconnected!");
    }
  };
  const handleLogout = () => {
    logout();
    notify.info("Wallet Disconnected");
    dispatch(setLogout());
  };
  useEffect(() => {
    if (!isLogin) return;
    if (signUp) return;
    dispatch(setWalletConnect(false));
    handleLogin();
    return () => {};
  }, [isLogin]);

  return (
    <>
      <div className="fixed navbar flex items-center py-6 z-10 bg-[#1B1B24]">
        <div
          className="m-rounded p-3 md:p-4 cursor-pointer anim hover:bg-card mr-6 lg:hidden"
          onClick={() => {
            dispatch(setMenu(true));
          }}
        >
          <Iconify
            icon="material-symbols:menu-rounded"
            className="w-6 h-6 cursor-pointer"
          ></Iconify>
        </div>
        <div className="justify-center items-center gap-2 uppercase text-xs hidden lg:flex">
          <div className="rounded-full w-1.5 h-1.5 bg-green"></div>
          Network Status
        </div>
        <div className="ml-auto text-sm lg:text-base flex gap-2">
          {auth.token ? (
            <div className="flex items-center gap-2">
              <Dropdown handleLogout={handleLogout}></Dropdown>
            </div>
          ) : (
            <>
              <button
                className="m-rounded px-5 py-2 text-xs md:text-base hover:bg-card anim"
                onClick={() => {
                  dispatch(setWalletConnect(true));
                  dispatch(setLogin(true));
                }}
              >
                Login
              </button>
              <button
                className="m-rounded px-5 py-2 text-xs md:text-base hover:bg-indigoBright anim bg-indigo text-white "
                onClick={() => {
                  dispatch(setSignUp(true));
                }}
              >
                Sign Up
              </button>
            </>
          )}
          <div className="m-rounded p-3 md:p-4 cursor-pointer anim hover:bg-card">
            <Iconify
              icon="mdi:bell-outline"
              className={" w-6 h-6 cursor-pointer"}
            ></Iconify>
          </div>
        </div>
      </div>
      <button
        className="z-20 fixed right-5 bottom-5 w-[48px] h-[48px] text-center justify-center flex items-center bg-[url('app/assets/images/button2.png')] bg-[length:100%_100%] text-white rounded-full text-xs md:text-base transition-all duration-300 hover:shadow-[0_0_15px_5px_#818cf850]"
        onClick={() => dispatch(setChat(true))}
      >
        <Chat2 className="w-4 h-4" />
      </button>
    </>
  );
};

export default Navbar;
