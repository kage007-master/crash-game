import { useRef, useState, useEffect } from "react";
import Iconify from "./Iconify";
import { coinSVG, coins } from "app/config/const";

export default function ChainList(props: any) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { chain, setChain, swap, except } = props;
  const MainCoin = coinSVG[chain];

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className={"relative flex items-center"}>
      <div onClick={toggleDropdown} className={swap ? "w-auto" : "w-full"}>
        <div
          className={
            "flex justify-between items-center border border-border rounded-xl gap-2 text-base cursor-pointer" +
            (swap ? " bg-card p-2" : " p-4")
          }
        >
          <div className="flex items-center gap-2">
            <MainCoin className="w-6 h-6"></MainCoin>
            <div className="uppercase">{chain}</div>
          </div>
          <Iconify
            icon={"material-symbols:keyboard-arrow-down-rounded"}
            className={"w-5 h-5 text-white"}
          ></Iconify>
        </div>
      </div>
      {isOpen && (
        <div
          className={`absolute top-[110%] left-0 bg-border rounded-md z-30 py-2 shadow-md anim-dropdown gap-2 flex flex-col right-0`}
        >
          <div className=" h-[160px] overflow-y-auto mx-2">
            {coins.map((currency: string) => {
              const CoinIcon = coinSVG[currency];
              return currency === chain || currency === except ? (
                <div key={currency}></div>
              ) : (
                <div
                  key={currency}
                  className="flex py-3 gap-2 text-xs items-center cursor-pointer hover:bg-indigo/5"
                  onClick={() => {
                    setIsOpen(false);
                    setChain(currency);
                  }}
                >
                  <CoinIcon className="w-6 h-6"></CoinIcon>
                  <div className="uppercase">{currency}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
