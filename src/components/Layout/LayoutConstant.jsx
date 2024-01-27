import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import { NavLink } from "react-router-dom";

export const sidebarItems = [
  {
    icon: <DesktopOutlined />,
    label: <NavLink to="/">Dashboard</NavLink>,
    // key: "dashboard",
  },
  {
    icon: <PieChartOutlined />,
    label: <NavLink to="/categories">Categories</NavLink>,
    // key: "categories",
    // children: [
    //   {
    //     icon: <FileOutlined />,
    //     label: <Link to="/categoriesOne">Onw</Link>,
    //     key: "categoriesOne",
    //   },
    //   {
    //     icon: <FileOutlined />,
    //     label: <Link to="/categoriesTwo">Two</Link>,
    //     key: "categoriesTwo",
    //   },
    //   {
    //     icon: <FileOutlined />,
    //     label: <Link to="/categoriesThree">Three</Link>,
    //     key: "categoriesThree",
    //   },
    // ],
  },
  {
    icon: <UserOutlined />,
    label: <NavLink to="/posts">Posts</NavLink>,
    // key: "posts",
  },
  {
    icon: <FileOutlined />,
    label: <NavLink to="/users">Users</NavLink>,
    // key: "users",
  },
  {
    icon: <TeamOutlined />,
    label: <NavLink to="/comments">Comments</NavLink>,
    // key: "comments",
  },
  {
    icon: <TeamOutlined />,
    label: <NavLink>Log out</NavLink>,
    // key: "logOut",
  },
];
