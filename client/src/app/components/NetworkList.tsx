import { useRef, useState, useEffect } from "react";
import Iconify from "./Iconify";
import { networks, networkNames } from "app/config/const";

export default function NetworkList(props: any) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { chain, network, setNetwork } = props;

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
    <div ref={dropdownRef} className="relative flex items-center">
      <div onClick={toggleDropdown} className="w-full">
        <div className="flex justify-between items-center border border-border rounded-xl p-4 gap-2 text-base cursor-pointer">
          <div className="flex items-center gap-2">
            {networkNames[network as TNewtwork]}
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
          <div className=" max-h-[160px] overflow-y-auto mx-2">
            {networks[chain as TCoin].map((network: string) => (
              <div
                key={network}
                className="flex py-2 gap-2 items-center cursor-pointer hover:bg-indigo/5"
                onClick={() => {
                  setIsOpen(false);
                  setNetwork(network);
                }}
              >
                {networkNames[network as TNewtwork]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
