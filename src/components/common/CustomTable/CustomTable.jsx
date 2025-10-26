import { Table } from "antd";
import { PAGINATION_CONSTANT } from "../../../utilities/UtilConstants";

function CustomTable({
  data,
  columns,
  rowKey = (record) => record.id,
  pagination = PAGINATION_CONSTANT,
  ...rest
}) {
  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey={rowKey}
      pagination={pagination}
      {...rest}
    />
  );
}

export default CustomTable;
