import { useState } from "react";

export const Transaction = () => {
  const [detail, setDetail] = useState(false);

  const toggleDetails = (e) => {
    setDetail(!detail);
  };

  return (
    <table className="transactions">
      <thead className="transaction-head">
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Balance</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="transaction-body">
        <tr>
          <th>27/02/20</th>
          <th>Golden Sun Bakery</th>
          <th>$8.00</th>
          <th>$298.00</th>
          <th onClick={toggleDetails}>
            <i className="fa-solid fa-angle-down"></i>
          </th>
        </tr>
      </tbody>
    </table>
  );
};
