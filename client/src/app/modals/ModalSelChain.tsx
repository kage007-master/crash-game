import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setChain, setSelChain } from "app/store/modal.slice";
import { coinSVG, coins } from "app/config/const";
import { RootState } from "app/store";
import Iconify from "app/components/Iconify";

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
        className={`bg-border rounded-md z-30 p-5 shadow-md anim-dropdown gap-2 flex-col min-w-[150px]`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-2 py-1">
            <img
              alt="avatar"
              src={auth.user.avatar}
              className="w-6 h-6 rounded-full border border-secondary"
            />
            <div className="text-indigo">{auth.user.name}</div>
          </div>
          <button
            onClick={() => {
              dispatch(setSelChain(false));
            }}
          >
            <Iconify
              icon="uiw:close"
              className={" w-4 h-4 cursor-pointer"}
            ></Iconify>
          </button>
        </div>
        <div className="border-t border-indigo/10 mt-3"></div>
        <div className="max-h-[60vh] overflow-y-auto mt-2">
          {coins.map((currency: string) => {
            const CoinIcon = coinSVG[currency];
            return (
              <div className="flex items-center justify-between" key={currency}>
                <div
                  className="w-[90%] m-overflow flex py-3 px-2 gap-2 text-xs items-center cursor-pointe"
                  onClick={() => {
                    dispatch(setSelChain(false));
                    dispatch(setChain(currency));
                  }}
                >
                  <CoinIcon className="min-w-[24px] min-h-[24px] w-6 h-6"></CoinIcon>
                  <div>{auth.user.balance[currency as TCoin]}</div>
                  <div className="uppercase">{currency}</div>
                </div>
                {currency === chain ? (
                  <div className="rounded-full w-1.5 h-1.5 mr-3 bg-green"></div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelChain;
