import React from "react";

const ContestTable = () => {
  return (
    <table className="hidden lg:block w-full text-xs">
      <thead>
        <tr className="uppercase">
          <th className="text-left font-[400] uppercase">Ranking</th>
          <th className="text-left font-[400] uppercase">ID</th>
          <th className="text-left font-[400] uppercase">Cash Out</th>
          <th className="text-left font-[400] uppercase">Bonus</th>
          <th className="text-right font-[400] uppercase">Profit</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default ContestTable;
