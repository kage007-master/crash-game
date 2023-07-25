import React, { useEffect, useState } from "react";
import { setChat } from "app/store/modal.slice";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "app/components/Iconify";
import { socketEvents } from "app/providers/socket";
import { getTimeAgo, shortenName } from "app/utils/util";
import { ReactComponent as Chat1 } from "app/assets/svg/Chat1.svg";
import { RootState } from "app/store";

const Chat = () => {
  const [text, setText] = useState("");
  const ref = React.useRef<HTMLInputElement>(null);
  const chat = useSelector((state: RootState) => state.modal.chat);
  const messages = useSelector((state: RootState) => state.message.history);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  }, [ref, messages.length]);

  return chat ? (
    <div className="chat fixed bottom-0 right-0 w-full mt-20 lg:w-[40%] bg-[#252533] z-20 px-5">
      <div className="py-8 border-b border-[#37374D] flex justify-between items-center">
        <p className="text-white text-lg">Chat</p>
        <button
          onClick={() => {
            dispatch(setChat(false));
          }}
        >
          <Iconify
            icon="uiw:close"
            className={" w-5 h-5 cursor-pointer"}
          ></Iconify>
        </button>
      </div>
      <div className="chat-content" ref={ref}>
        {messages.map((message: any) => {
          return (
            <div
              key={message.address + message.time}
              className={`my-4 flex gap-4 ${
                message.address === user.address ? " flex-row-reverse" : ""
              }`}
            >
              <img
                alt="avatar"
                src={message.avatar}
                className="w-[36px] min-w-[36px] h-[36px] rounded-full"
              />
              <div className="lg:max-w-[80%]">
                <div
                  className={`flex ${
                    message.address === user.address ? " justify-end" : ""
                  }`}
                >
                  <p className="text-white mr-2">
                    {message.address === user.address ? "You" : message.name}
                  </p>
                  {getTimeAgo(message.time)}
                </div>
                <div
                  className={`p-5 bg-[#2A2A38] my-2 font-medium text-[16px] ${
                    message.address === user.address
                      ? "chat-mine"
                      : "chat-other"
                  }`}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {message.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 mb-5 flex items-center chat-message">
        <input
          className="bg-transparent chat-input"
          placeholder="Your message here ..."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.code === "Enter") {
              socketEvents.emitMessage(text, user.name);
              setText("");
            }
          }}
        ></input>
        <button className="w-[48px] h-[48px] text-center justify-center flex items-center rounded-full text-xs md:text-base relative transition-all duration-300 hover:shadow-[0_0_15px_5px_#818cf850]">
          <Iconify icon={"uil:smile"} className={"w-4 h-4"}></Iconify>
        </button>
        <button
          className="w-[48px] h-[48px] text-center justify-center flex items-center bg-[url('app/assets/images/button2.png')] bg-[length:100%_100%] text-white rounded-full text-xs md:text-base relative transition-all duration-300 hover:shadow-[0_0_15px_5px_#818cf850]"
          onClick={() => {
            socketEvents.emitMessage(text, user.name);
            setText("");
          }}
        >
          <Chat1 className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Chat;
