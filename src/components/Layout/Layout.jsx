import { Layout, Menu } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom/dist";
import { sidebarItems } from "./LayoutConstant";
import { ROUTE_CONSTANT } from "../../Pages/Routes/route.constant";
import ProfileMenu from "./ProfileMenu";
const { Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
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
          href={ROUTE_CONSTANT.HOME}
        >
          {collapsed ? "BP" : "Blog Portal"}
        </h1>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems}
        />
      </Sider>
      <Layout style={{ background: "#f1f5f9" }}>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: "24px 20px",
              position: "relative",
            }}
          >
            <ProfileMenu />
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#f1f5f9",
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
