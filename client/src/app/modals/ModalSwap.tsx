import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setSwap } from "app/store/modal.slice";
import { RootState } from "app/store";
import { useState, useEffect } from "react";
import ChainList from "app/components/ChainList";
import { ToastrContext } from "app/providers/ToastrProvider";
import { useContext } from "react";
import NumberInput from "app/components/NumberInput";

Modal.setAppElement("body");

const ModalSwap = () => {
  const dispatch = useDispatch();
  const swap = useSelector((state: RootState) => state.modal.swap);
  const notify = useContext(ToastrContext);
  const [src, setSrc] = useState("usdt");
  const [dest, setDest] = useState("ebone");
  const maxfrom = useSelector(
    (state: RootState) => state.auth.user.balance[src as TCoin]
  );
  const minfrom = Math.min(Number(0.00000001), Number(maxfrom));
  const [from, setfrom] = useState(minfrom.toFixed(8));

  useEffect(() => {
    if (Number(from) > Number(maxfrom) || Number(from) < Number(minfrom))
      setfrom(Math.min(Number(minfrom), Number(maxfrom)).toFixed(8));
    return () => {};
  }, [maxfrom]);

  return (
    <Modal
      id="Swap"
      isOpen={swap}
      onRequestClose={() => {
        dispatch(setSwap(false));
      }}
      className="modal-fade modal-content text-sm md:text-base"
      overlayClassName="bg-[rgba(14,18,36,.7)] fixed w-full h-full top-0 left-0 backdrop-blur-xl z-50"
      contentLabel="Deposit"
    >
      <p className="my-2">Swap from</p>
      <div className="relative">
        <NumberInput
          onChange={(e: any) => {
            setfrom(e);
          }}
          onBlur={() => {
            const filterValue: any = Math.min(
              Math.max(Number(from), Number(minfrom)),
              Number(maxfrom)
            );
            setfrom(filterValue.toFixed(8));
          }}
          min={minfrom}
          max={maxfrom}
          value={from}
          fixed={8}
          className="w-full h-full bg-back py-4 px-4 m-rounded text-lg text-[white] transition duration-300 outline-none"
        ></NumberInput>
        <div className="absolute right-1 top-[7px]">
          <ChainList chain={src} setChain={setSrc} swap={true} />
        </div>
      </div>
      <p className="my-2">Swap to</p>
      <div className="relative">
        <NumberInput
          onChange={(e: any) => {
            setfrom(e);
          }}
          onBlur={() => {
            const filterValue: any = Math.min(
              Math.max(Number(from), Number(minfrom)),
              Number(maxfrom)
            );
            setfrom(filterValue.toFixed(8));
          }}
          min={minfrom}
          max={maxfrom}
          value={from}
          fixed={8}
          className="w-full h-full bg-back py-4 px-4 m-rounded text-lg text-[white] transition duration-300 outline-none"
        ></NumberInput>
        <div className="absolute right-1 top-[7px]">
          <ChainList chain={dest} setChain={setDest} swap={true} />
        </div>
      </div>
      <div className="flex justify-between my-2">
        <p>Swap fee:</p>
        <p className="uppercase">{`${from} ${src}`}</p>
      </div>
      <button className="my-2 border border-[#3CE5B5] rounded-xl p-3 flex items-center mx-auto text-[#3CE5B5]">
        Swap
      </button>
    </Modal>
  );
};

export default ModalSwap;
