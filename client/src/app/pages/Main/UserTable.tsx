import React from "react";
import { useSelector } from "react-redux";
import { coinSVG } from "app/config/const";
import { RootState } from "app/store";

const UserTable = () => {
  const gameState = useSelector((state: RootState) => state.crash.gameState);
  const players = useSelector((state: RootState) => state.crash.playerState);

  return (
    <>
      <div className="w-full h-hull text-lg hidden lg:block">
        <div className="text-xs usertable uppercase">
          <p>User</p>
          <p>Bet</p>
          <p>Cash Out</p>
          <p>Profit</p>
          <p className="text-right">Bonus</p>
        </div>
        {players.map((player: any, id: number) => {
          const CoinIcon = coinSVG[player.chain];
          return (
            <div
              key={"player" + id}
              className={`py-2 usertable ${
                player.cashPoint > 0
                  ? "text-[#34c2e6]"
                  : !gameState.isRising
                  ? "text-red-500"
                  : "text-[#4d555f]"
              }`}
            >
              <div className="flex items-center gap-1 w-full">
                <img
                  alt="avatar"
                  src={player.avatar}
                  className="w-5 h-5 rounded-full border border-border flex-none"
                />
                <div className="m-overflow">{player.name}</div>
              </div>
              <div className="m-overflow flex items-center gap-1 w-full">
                <CoinIcon className="w-4 h-4 flex-none"></CoinIcon>
                <div className="m-overflow">{player.betAmount.toFixed(8)}</div>
              </div>
              <div className="m-overflow">
                {player.cashPoint ? "x " + player.cashPoint.toFixed(2) : "-"}
              </div>
              <div className="m-overflow">
                {player.cashPoint
                  ? (
                      Number(player.betAmount) * Number(player.cashPoint - 1)
                    ).toFixed(8)
                  : "-"}
              </div>
              <div className="m-overflow text-right">{"-"}</div>
            </div>
          );
        })}
      </div>
      <div className="w-full lg:hidden">
        {players.map((player: any, id: number) => {
          const CoinIcon = coinSVG[player.chain];
          return (
            <div
              className={`relative ${
                player.cashPoint > 0
                  ? "text-[#34c2e6]"
                  : !gameState.isRising
                  ? "text-red-500"
                  : "text-[#4d555f]"
              }`}
              key={"player" + id}
            >
              <div className="uppercase flex justify-between border-b border-[#37374D] py-1">
                <div className="w-[50%] border-r border-[#37374D]">
                  <div className="text-secondary py-1">Bet</div>
                  <div className="flex items-center gap-2 py-1">
                    <CoinIcon className="w-4 h-4 flex-none"></CoinIcon>
                    <div className="text-sm">{player.betAmount.toFixed(8)}</div>
                  </div>
                </div>
                <div className="text-right w-50">
                  <div className="text-secondary py-1">Cash Out</div>
                  <div className="text-sm py-1 lowercase">
                    {player.cashPoint
                      ? "x " + player.cashPoint.toFixed(2)
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="uppercase flex justify-between py-1">
                <div className="w-[50%] border-r border-[#37374D]">
                  <div className="text-secondary py-1">Profit</div>
                  <div className="text-sm py-1">
                    {player.cashPoint
                      ? (
                          Number(player.betAmount) *
                          Number(player.cashPoint - 1)
                        ).toFixed(8)
                      : "-"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-secondary py-1">Bonus</div>
                  <div className="text-sm py-1">{"-"}</div>
                </div>
              </div>
              <div className="user-icon">
                <img
                  alt="avatar"
                  src={player.avatar}
                  className="w-[36px] min-w-[36px] h-[36px] rounded-full mx-auto"
                />
                <p className="text-center">{player.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserTable;
