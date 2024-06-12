import { Account } from "../components/account";
import { UserHeader } from "../components/user-header";

export const User = () => {
  return (
    <div>
      <UserHeader />
      <h2 className="sr-only">Accounts</h2>
      <Account />
      <Account />
      <Account />
    </div>
  );
};
