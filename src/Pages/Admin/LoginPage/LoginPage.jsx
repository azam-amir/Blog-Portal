import { App, Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/AuthService";

function LoginPage() {
  const navigate = useNavigate();
  const { message } = App.useApp();

  const onFinish = (values) => {
    if (values.emailOrUsername && values.password) {
      const userData = AuthService.addUser(values);

      if (userData?.token) {
        message.success("Login successful!");
        navigate("/");
      } else {
        message.error("Something went wrong while logging in");
      }
    } else {
      message.error("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <Card title="Admin Login" style={{ width: 350 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="emailOrUsername"
            label="Email or Username"
            rules={[
              { required: true, message: "Please enter email or username" },
            ]}
          >
            <Input placeholder="Enter email or username" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
