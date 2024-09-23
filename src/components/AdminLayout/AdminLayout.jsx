import React, { useState } from "react";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import "./AdminLayout.css";
import { Outlet, useNavigate } from "react-router-dom";
import { sidebarItems } from "./admin-layout-constant";
import { UnAuthenticatedRoutesNames } from "../../utilities/util.constant";
const { Content, Footer, Sider } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <h1
          className="custom-heading-one"
          onClick={() => navigate(UnAuthenticatedRoutesNames.HOME)}
        >
          Blog Website
        </h1>

        <h3
          className="custom-heading-one"
          onClick={() => navigate(UnAuthenticatedRoutesNames.HOME)}
        >
          Blog Portal
        </h3>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Squadcodersdev ©{new Date().getFullYear()} Created by Muzammil
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
