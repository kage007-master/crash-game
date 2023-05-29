import React from "react";
import { coinSVG } from "app/config/const";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { getColor } from "app/utils/util";

const MyTable = () => {
  const mybets = useSelector((state: RootState) => state.crash.mybets);

  return (
    <>
      <div className="h-0 opacity-0 w-0 lg:w-full lg:h-auto lg:opacity-100">
        <div className="bettable uppercase">
          <p>Game Id</p>
          <p>Bet Amount</p>
          <p>Cash Out</p>
          <p>Bonus</p>
          <p className="text-right">Profit</p>
        </div>
        <div className="max-h-[450px] overflow-auto">
          {mybets.map((bet: Bet) => {
            const CoinIcon = coinSVG[bet.chain];
            return (
              <div className="bettable text-lg uppercase" key={bet.gameID}>
                <div className="m-overflow py-2 pr-2">{bet.gameID}</div>
                <div className="m-overflow flex items-center gap-2 py-2 mr-4">
                  <CoinIcon className="min-w-[32px] w-8 h-8" />
                  <span className="text-white">
                    {bet.betAmount.toFixed(8)}
                  </span>{" "}
                  {bet.chain}
                </div>
                <div
                  className="py-2 lowercase"
                  style={{ color: getColor(bet.cashPoint) }}
                >
                  x {bet.cashPoint.toFixed(2)}
                </div>
                <div className="text-white py-2">{bet.bonus.toFixed(8)}</div>
                <div className="text-white py-2 text-right">
                  {(bet.betAmount * (bet.cashPoint - 1)).toFixed(8)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="lg:hidden max-h-[700px] overflow-auto pr-2">
        {mybets.map((bet: Bet) => {
          const CoinIcon = coinSVG[bet.chain];
          return (
            <div className="uppercase text-sm mb-3" key={bet.gameID}>
              <div className="flex items-center justify-between border-b border-[#37374D]">
                <div className="flex items-center gap-2 py-2 max-w-[70%]">
                  <CoinIcon className="min-w-[48px] w-12 h-12" />
                  <div className="m-overflow">
                    <div>
                      <span className="text-white">
                        {bet.betAmount.toFixed(8)}
                      </span>{" "}
                      {bet.chain}
                    </div>
                    <div className="text-xs pt-1">ID: {bet.gameID}</div>
                  </div>
                </div>
                <div className="text-right py-2">
                  <div className="text-xs">Cash Out</div>
                  <div
                    className="pt-1 lowercase"
                    style={{ color: getColor(bet.cashPoint) }}
                  >
                    x {bet.cashPoint.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="py-2">
                  <div className="text-xs">Bonus</div>
                  <div className="text-white pt-1">{bet.bonus.toFixed(8)}</div>
                </div>
                <div className="text-right py-2">
                  <div className="text-xs">Profit</div>
                  <div className="text-white pt-1">
                    {(bet.betAmount * (bet.cashPoint - 1)).toFixed(8)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyTable;
