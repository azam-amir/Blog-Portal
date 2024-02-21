import { Button } from "antd";

export const dataSource = [
  {
    key: "1",
    name: "Roman",
    age: 35,
    address: "14 Downing Street",
  },
  {
    key: "2",
    name: "Johnsens",
    age: 46,
    address: "13 Downing Street",
  },
  {
    key: "3",
    name: "Peeterest",
    age: 41,
    address: "30 Downing Street",
  },
  {
    key: "4",
    name: "Johnseena",
    age: 22,
    address: "56 Downing Street",
  },
];

// export const columns = [
//   {
//     title: <h3 style={{ height: "6px", marginTop: "-3px" }}>Name</h3>,
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: <h3 style={{ height: "6px", marginTop: "-3px" }}>Age</h3>,
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: <h3 style={{ height: "6px", marginTop: "-3px" }}>Address</h3>,
//     dataIndex: "address",
//     key: "address",
//   },
// ];
export const columns = [
  {
    title: "Id",
    key: "id",
    render: (singleData) => {
      return "12";
    },
  },
  {
    title: "Category Title",
    key: "categoryTitle",
    render: (singleData) => {
      return "abcd asdf";
    },
  },
  {
    title: "Created At",
    key: "createdAt",
    render: (singleData) => {
      return "20-05-2018";
    },
  },
  {
    title: "Updated At",
    key: "updatedAt",
    render: (singleData) => {
      return "30-02-2023";
    },
  },
  // {
  //   title: "Category Title",
  //   key: "categoryTitle",
  //   render: (singleData) => {
  //     return singleData.cat_title;
  //   },
  // },
  {
    title: "Edit",
    key: "edit",
    render: () => {
      return <Button type="primary">Edit</Button>;
    },
  },
  {
    title: "Delete",
    key: "delete",
    render: (singleCategory) => {
      return <Button type="default">Delete</Button>;
    },
  },
];
