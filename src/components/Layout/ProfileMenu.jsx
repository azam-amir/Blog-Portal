import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { AuthService } from "../../services/AuthService";
import { getDisplayName } from "../../utilities/UtilConstants";

function ProfileMenu() {
  const user = AuthService.getUserDetails();

  const handleLogout = () => {
    AuthService.logout();
  };

  const menu = (
    <Menu
      items={[
        {
          key: "logout",
          label: (
            <span
              onClick={handleLogout}
              style={{
                color: "red",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <LogoutOutlined /> Logout
            </span>
          ),
        },
      ]}
    />
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 22,
        right: 20,
      }}
    >
      <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
        <Space
          style={{
            cursor: "pointer",
            background: "#fff",
            padding: "6px 12px",
            borderRadius: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Avatar src={user?.avatar} icon={<UserOutlined />} />
          <span style={{ fontWeight: 500 }}>
            {getDisplayName(user?.emailOrUsername)}
          </span>
        </Space>
      </Dropdown>
    </div>
  );
}

export default ProfileMenu;
