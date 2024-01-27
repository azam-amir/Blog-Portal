import React, { useState } from "react";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { sidebarItems } from "./LayoutConstant";
import { Outlet } from "react-router-dom/dist";
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
        <div className="demo-logo-vertical" />
        <h1
          style={{
            color: "white",
            fontWeight: 700,
            textAlign: "center",
            marginLeft: "-10px",
            cursor: "pointer",
          }}
          href="/"
        >
          Blog Portal
        </h1>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
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
              borderRadius: borderRadiusLG,
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
          Muhammad Azam Raza ©{new Date().getFullYear()} Created by
          AzamRazaOfficial 🤞 || Starting Date 1/27/2024
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
