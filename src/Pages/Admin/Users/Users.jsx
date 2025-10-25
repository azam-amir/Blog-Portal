import { useNavigate } from "react-router-dom";
import ReusableHeader from "../../../common/Header/ReusableHeader";
import UsersTable from "./UsersTable/UsersTable";
import { ROUTE_CONSTANT } from "../../Routes/route.constant";
import { useUserStore } from "../../../store/usersStore/usersStore";

function Users() {
  const navigate = useNavigate();

  const { data } = useUserStore();

  return (
    <div>
      <ReusableHeader
        heading="Users"
        btnName="+ Add Users"
        buttonClick={() => navigate(ROUTE_CONSTANT.ADD_USERS)}
      />
      <UsersTable data={data} />
    </div>
  );
}

export default Users;
