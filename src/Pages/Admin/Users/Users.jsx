import React from "react";
import ReusableHeader from "../../../common/Header/ReusableHeader";
import UsersTable from "./UsersTable/UsersTable";

function Users() {
  return (
    <div>
      <ReusableHeader heading="Users" btnName="+ Add Users" />
      <UsersTable />
    </div>
  );
}

export default Users;
