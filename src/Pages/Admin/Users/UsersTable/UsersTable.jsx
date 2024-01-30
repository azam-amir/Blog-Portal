import { Table } from "antd";
import React from "react";
import { columns, dataSource } from "./UsersTableData";

function UsersTable() {
  return (
    <div
      style={{
        marginTop: "50px",
        background: "white",
        borderRadius: "15px",
      }}
    >
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default UsersTable;
