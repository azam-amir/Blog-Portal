import { useNavigate } from "react-router-dom";
import ReusableHeader from "../../../common/Header/ReusableHeader";
import BreadCrumbs from "../../../components/common/BreadCrumbs/BreadCrumbs";
import { useCategoryStore } from "../../../store/categoryStore/categoryStore";
import { ROUTE_CONSTANT } from "../../Routes/route.constant";
import CategoryTable from "./CategoryTable/CategoryTable";

function Categories() {
  const navigate = useNavigate();

  const { data } = useCategoryStore();

  return (
    <div>
      <BreadCrumbs items={[{ title: "Category" }]} />
      <ReusableHeader
        heading="Category"
        btnName="+ Add Category"
        buttonClick={() => navigate(ROUTE_CONSTANT.ADD_CATEGORY)}
      />
      <CategoryTable data={data} />
    </div>
  );
}

export default Categories;
