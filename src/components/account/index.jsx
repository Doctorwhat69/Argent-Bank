import { useState } from "react";
import { Transaction } from "../transaction";

export const Account = () => {
  const [slider, setSlider] = useState(false);

  const toggleSlider = (e) => {
    setSlider(!slider);
  };

  return (
    <>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button" onClick={toggleSlider}>
            View transactions
          </button>
        </div>
      </section>
      {slider && <Transaction />}
    </>
  );
};
