import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setChain, setSelChain } from "app/store/modal.slice";
import { coinSVG } from "app/config/const";
import { RootState } from "app/store";

Modal.setAppElement("body");

const ModalSelChain = () => {
  const dispatch = useDispatch();
  const selchain = useSelector((state: RootState) => state.modal.selchain);
  const chain = useSelector((state: RootState) => state.modal.chain);
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <Modal
      id="SelChain"
      isOpen={selchain}
      onRequestClose={() => {
        dispatch(setSelChain(false));
      }}
      className="modal-fade modal-content bg-transparent"
      overlayClassName="bg-[rgba(14,18,36,.7)] fixed w-full h-full top-0 left-0 backdrop-blur-xl z-50"
      contentLabel="Sign Up"
    >
      <p className="text-center text-white text-2xl mb-5">Choose your wallet</p>
      <div
        className={`bg-border rounded-md z-30 p-2 shadow-md anim-dropdown gap-2 flex-col min-w-[150px]`}
      >
        <div className="flex items-center gap-2  px-2 py-1">
          <img
            alt="avatar"
            src={auth.user.avatar}
            className="w-6 h-6 rounded-full border border-secondary"
          />
          <div className="text-indigo">{auth.user.name}</div>
        </div>
        <div className="border-t border-indigo/10 mx-3"></div>
        <div className="max-h-[60vh] overflow-y-auto mr-1">
          {Object.keys(auth.user.balance).map((currency: string) => {
            const CoinIcon = coinSVG[currency];
            return (
              <div
                key={currency}
                className={`flex py-1 px-2 gap-2 text-xs items-center cursor-pointer ${
                  currency === chain
                    ? "text-bright bg-indigo/10"
                    : " hover:bg-indigo/5"
                }`}
                onClick={() => {
                  dispatch(setSelChain(false));
                  dispatch(setChain(currency));
                }}
              >
                <CoinIcon className="w-6 h-6"></CoinIcon>
                <div>{auth.user.balance[currency as TCoin]}</div>
                <div className="uppercase">{currency}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelChain;
