import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gethistory } from "app/store/crash.slice";
import { AppDispatch, RootState } from "app/store";

const HistoryTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useSelector((state: RootState) => state.crash.history);

  useEffect(() => {
    dispatch(gethistory());
  }, []);

  return (
    <div className="">
      <table className="w-full">
        <thead>
          <tr className="uppercase text-xs text-left">
            <th className="font-[400]">Game Id</th>
            <th className="font-[400]">Cash Out</th>
          </tr>
        </thead>
        <tbody className="text-base lg:text-lg max-h-[400px] overflow-auto">
          {history.map((game: Game) => {
            return (
              <tr className="text-white" key={game._id}>
                <td className="max-w-[80%] m-overflow py-2">{game._id}</td>
                <td className="py-2">x {game.cashPoint}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
