import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Iconify from "./Iconify";
import { RootState } from "app/store";
import { setDeposit, setSwap, setWithdraw } from "app/store/modal.slice";

export default function Dropmenu(props: any) {
  const dropmenuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropmenuRef.current &&
      !dropmenuRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const toggleDropmenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropmenuRef} className={props.className}>
      <div onClick={toggleDropmenu}>
        <img src={auth.user.avatar} className="w-12 cursor-pointer"></img>
      </div>
      {isOpen && (
        <div
          className={`absolute top-[110%] left-[-120px] bg-border rounded-md z-30 py-2 shadow-md anim-dropdown gap-2 flex flex-col right-0`}
        >
          <div
            className="flex gap-2  items-center hover:bg-indigo/5 px-2 py-1 cursor-pointer text-sm"
            onClick={() => dispatch(setDeposit(true))}
          >
            <Iconify
              icon={
                "streamline:money-atm-card-2-deposit-money-payment-finance-atm-withdraw"
              }
              className="w-6 h-6"
            />
            <div>Deposit</div>
          </div>
          <div
            className="flex gap-2  items-center hover:bg-indigo/5 px-2 py-1 cursor-pointer text-sm"
            onClick={() => dispatch(setWithdraw(true))}
          >
            <Iconify icon={"bx:money-withdraw"} className="w-6 h-6" />
            <div>Withdraw</div>
          </div>
          <div
            className="flex gap-2  items-center hover:bg-indigo/5 px-2 py-1 cursor-pointer text-sm"
            onClick={() => dispatch(setSwap(true))}
          >
            <Iconify icon={"ri:swap-line"} className="w-6 h-6" />
            <div>Swap</div>
          </div>
          <div
            className="flex gap-2  items-center hover:bg-indigo/5 px-2 py-1 cursor-pointer text-sm"
            onClick={props.handleLogout}
          >
            <Iconify icon={"humbleicons:logout"} className="w-6 h-6" />
            <div>Logout</div>
          </div>
        </div>
      )}
    </div>
  );
}
