import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setWithdraw } from "app/store/modal.slice";
import { RootState } from "app/store";
import { useState, useEffect } from "react";
import ChainList from "app/components/ChainList";
import NetworkList from "app/components/NetworkList";
import { ToastrContext } from "app/providers/ToastrProvider";
import { useContext } from "react";
import { fees, limits, networks } from "app/config/const";
import NumberInput from "app/components/NumberInput";
import axios from "axios";
import { setBalance } from "app/store/auth.slice";

Modal.setAppElement("body");

const ModalWithdraw = () => {
  const dispatch = useDispatch();
  const withdraw = useSelector((state: RootState) => state.modal.withdraw);
  const notify = useContext(ToastrContext);
  const [chain, setChain] = useState("ebone");
  const [network, setNetwork] = useState("mvx");
  const [to, setReciever] = useState("");
  const { user } = useSelector((state: RootState) => state.auth);
  const fixedAmount = 8;
  const maxAmount = useSelector(
    (state: RootState) => state.auth.user.balance[chain as TCoin]
  );
  const minAmount = Math.min(
    limits[chain as TCoin][network],
    Number(maxAmount)
  );
  const [Amount, setAmount] = useState(minAmount.toFixed(8));

  const onSetChain = (newchain: string) => {
    if (newchain != chain) {
      setNetwork(networks[newchain as TCoin][0]);
      setChain(newchain);
    }
  };

  const onWithdraw = async () => {
    if (!to) notify.warning("Input your withdrawal address.");
    if (Number(Amount) === 0) notify.warning("Input your withdrawal amount.");
    if (Number(Amount) > user.balance[chain as TCoin])
      notify.warning("You have insufficient amount to withdraw.");
    if (Number(Amount) < limits[chain as TCoin][network])
      notify.warning("You should have a minimum withdrawal  amount.");
    if (
      Number(Amount) > limits[chain as TCoin][network] &&
      to &&
      Number(Amount) <= user.balance[chain as TCoin]
    ) {
      try {
        let { result } = (
          await axios.post("https://95.216.101.240:4001/withdraw", {
            address: user.address,
            name: user.name,
            chain,
            network,
            to,
            amount: Number(Amount),
          })
        ).data;
        notify.success(result);
        dispatch(setBalance({ chain, amount: -Number(Amount) }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (
      Number(Amount) > Number(maxAmount) ||
      Number(Amount) < Number(minAmount)
    )
      setAmount(Math.min(Number(minAmount), Number(maxAmount)).toFixed(8));
    return () => {};
  }, [maxAmount]);

  return (
    <Modal
      id="Withdraw"
      isOpen={withdraw}
      onRequestClose={() => {
        dispatch(setWithdraw(false));
      }}
      className="modal-fade modal-content text-sm md:text-base"
      overlayClassName="bg-[rgba(14,18,36,.7)] fixed w-full h-full top-0 left-0 backdrop-blur-xl z-50"
      contentLabel="Deposit"
    >
      <p className="my-2">Withdraw Currency</p>
      <ChainList chain={chain} setChain={onSetChain} swap={false} />
      <p className="my-2">Choose Network</p>
      <NetworkList chain={chain} network={network} setNetwork={setNetwork} />
      <p className="my-2">Withdrawal Address</p>
      <input
        className="w-full h-full bg-back py-4 px-4 m-rounded text-lg text-white transition duration-300 outline-none"
        value={to}
        onChange={(e: any) => {
          setReciever(e.target.value);
        }}
      />
      <div className="relative flex my-2 justify-between">
        <p className="">Withdraw Amount</p>
        <p>{`Min: ${limits[chain as TCoin][network]}`}</p>
      </div>
      <NumberInput
        onChange={(e: any) => {
          setAmount(e);
        }}
        onBlur={() => {
          const filterValue: any = Math.min(
            Math.max(Number(Amount), Number(minAmount)),
            Number(maxAmount)
          );
          setAmount(filterValue.toFixed(fixedAmount));
        }}
        min={minAmount}
        max={maxAmount}
        value={Amount}
        fixed={fixedAmount}
        className="w-full h-full bg-back py-4 px-4 m-rounded text-lg text-[white] transition duration-300 outline-none"
      ></NumberInput>
      <div className="relative flex my-2 justify-between">
        <p className="">Fee:</p>
        <p className="uppercase">{`${
          fees[chain as TCoin][network]
        } ${chain}`}</p>
      </div>
      <div className="relative flex my-2 justify-between">
        <p className="">You will get:</p>
        <p className="uppercase">{`${Math.max(
          Number(Amount) - fees[chain as TCoin][network],
          0
        ).toFixed(8)} ${chain}`}</p>
      </div>
      <button
        className="my-2 border border-[#3CE5B5] rounded-xl p-3 flex items-center mx-auto text-[#3CE5B5]"
        onClick={onWithdraw}
      >
        Confirm
      </button>
      <p className="text-sm">
        <span className="text-white">Notice:</span> For security purposes, large
        or suspicious withdrawal may take 1-6 hours for audit process. We
        appreciate your patience!
      </p>
    </Modal>
  );
};

export default ModalWithdraw;
