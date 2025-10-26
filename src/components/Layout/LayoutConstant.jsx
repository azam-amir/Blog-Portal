import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export const sidebarItems = [
  {
    icon: <DesktopOutlined />,
    label: <NavLink to="/">Dashboard</NavLink>,
  },
  {
    icon: <PieChartOutlined />,
    label: <NavLink to="/categories">Categories</NavLink>,
  },
  {
    icon: <UserOutlined />,
    label: <NavLink to="/posts">Posts</NavLink>,
  },
  {
    icon: <FileOutlined />,
    label: <NavLink to="/users">Users</NavLink>,
  },
  {
    icon: <TeamOutlined />,
    label: <NavLink to="/comments">Comments</NavLink>,
  },
];
