import React from "react";
import ReusableHeader from "../../../common/Header/ReusableHeader";
import CategoryTable from "./CategoryTable/CategoryTable";

function Categories() {
  return (
    <div>
      <ReusableHeader
        heading="Category"
        btnName="+ Add Category"
        click="category"
      />
      <CategoryTable />
    </div>
  );
}

export default Categories;
