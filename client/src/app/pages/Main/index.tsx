import { useState, useRef } from "react";
import Rocket from "./Rocket";
import UserTable from "./UserTable";
import Action from "./Action";
import Sidebar from "./Sidebar";
import MyTable from "./MyTable";
import HistoryTable from "./HistoryTable";
import ContestTable from "./ContestTable";

import Navbar from "./Navbar";
import Chat from "./Chat";
const tabs = [
  { text: "My Bet", content: MyTable },
  { text: "History", content: HistoryTable },
  // { text: "Contest", content: ContestTable },
];
const Main = () => {
  const [tabActive, setTabActive] = useState("My Bet");
  const rocketRef = useRef(null);
  return (
    <>
      <div className="flex text-secondary text-xs lg:base">
        <Sidebar></Sidebar>
        <div className="w-full relative lg:ml-24 px-4 lg:px-6">
          <Navbar></Navbar>
          <Chat></Chat>
          <div className="w-full relative mt-28 md:mt-28">
            <div className="lg:flex lg:gap-8">
              <div className="lg:w-[60%]">
                <Rocket refer={rocketRef}></Rocket>
                <Action target={rocketRef}></Action>
              </div>
              <div className="lg:w-[40%] mt-6 lg:mt-0">
                <UserTable></UserTable>
              </div>
            </div>
          </div>
          {/* //--------Tab----------- */}
          <div className="mt-8 lg:mt-20 relative">
            <div className="flex item-center justify-center text-lg text-center relative">
              <img
                src="/images/shine.png"
                className="w-4/5 absolute left-[10%] z-[-2] bottom-0 "
              ></img>
              <div className="bottom-0 absolute bg-gradient-to-r from-[#fff0] via-[#fff1] to-[#fff0] h-0.5 w-full z-[-1]"></div>
              {tabs.map((item: any, id: number) => {
                return (
                  <div
                    className="lg:w-60 w-[50%] cursor-pointer group anim"
                    key={"tabs" + id}
                    onClick={() => {
                      setTabActive(item.text);
                    }}
                  >
                    <div
                      className={
                        "px-4 py-2 lg:py-4 " +
                        (tabActive == item.text && "text-white")
                      }
                    >
                      {item.text}
                    </div>
                    <div
                      className={
                        (tabActive == item.text
                          ? "bg-gradient-to-r from-[#5E5BF8] via-[#9750F3] to-[#57A9F4]"
                          : "bg-transparent group-hover:bg-[#fff2]") +
                        " h-0.5 w-full anim"
                      }
                    ></div>
                  </div>
                );
              })}
            </div>
            <div className="pb-5 min-h-[400px]">
              {tabs.map((item, id) => {
                return (
                  <div key={"tab-content-" + id}>
                    {item.text === tabActive && (
                      <>
                        <p className="text-white text-[22px] py-8">
                          {item.text}
                        </p>
                        <item.content></item.content>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
