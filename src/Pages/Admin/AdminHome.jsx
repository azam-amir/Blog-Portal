import {
  AppstoreOutlined,
  ArrowRightOutlined,
  FileTextOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic, Table } from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ReusableHeader from "../../common/Header/ReusableHeader";
import BreadCrumbs from "../../components/common/BreadCrumbs/BreadCrumbs";
import { useCategoryStore } from "../../store/categoryStore/categoryStore";
import { useCommentsStore } from "../../store/commentsStore/commentsStore";
import { usePostStore } from "../../store/postsStore/postsStore";
import { useUserStore } from "../../store/usersStore/usersStore";
import { ROUTE_CONSTANT } from "../Routes/route.constant";

function AdminHome() {
  const navigate = useNavigate();

  const { data: categories } = useCategoryStore();
  const { data: users } = useUserStore();
  const { data: posts } = usePostStore();
  const { data: comments } = useCommentsStore();

  const dashboardData = {
    users: users?.length || 0,
    posts: posts?.length || 0,
    comments: comments?.length || 0,
    categories: categories?.length || 0,
  };

  const stats = [
    {
      key: "users",
      title: "Users",
      value: dashboardData.users,
      icon: <UserOutlined style={{ color: "#1890ff" }} />,
      path: ROUTE_CONSTANT.USERS,
    },
    {
      key: "posts",
      title: "Posts",
      value: dashboardData.posts,
      icon: <FileTextOutlined style={{ color: "#52c41a" }} />,
      path: ROUTE_CONSTANT.POSTS,
    },
    {
      key: "comments",
      title: "Comments",
      value: dashboardData.comments,
      icon: <MessageOutlined style={{ color: "#faad14" }} />,
      path: ROUTE_CONSTANT.COMMENTS,
    },
    {
      key: "categories",
      title: "Categories",
      value: dashboardData.categories,
      icon: <AppstoreOutlined style={{ color: "#eb2f96" }} />,
      path: ROUTE_CONSTANT.CATEGORIES,
    },
  ];

  const [activeType, setActiveType] = useState("posts");

  const getWeeklyCounts = (data) => {
    const last7Days = Array.from({ length: 7 }).map((_, i) =>
      dayjs()
        .subtract(6 - i, "day")
        .format("ddd")
    );

    return last7Days.map((day) => {
      const count = data?.filter(
        (item) => dayjs(item.createdAt).format("ddd") === day
      ).length;
      return { name: day, count: count || 0 };
    });
  };

  const chartData = useMemo(() => {
    const map = {
      posts: posts,
      users: users,
      comments: comments,
      categories: categories,
    };
    return getWeeklyCounts(map[activeType] || []);
  }, [activeType, posts, users, comments, categories]);

  const getRecentData = (type) => {
    const map = {
      posts,
      users,
      comments,
      categories,
    };
    return map[type]
      ?.slice(-5)
      .reverse()
      .map((item) => ({
        key: item.id,
        title: item.title || item.userName || item.name || "N/A",
        createdAt: dayjs(item.createdAt).format("YYYY-MM-DD hh:mm A"),
      }));
  };

  const recentData = getRecentData(activeType);

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumbs items={[{ title: "Dashboard" }]} />

      {/* Header */}
      <ReusableHeader heading="Welcome to Dashboard" btnName="none" />

      {/* Stats Section */}
      <Row gutter={[24, 24]} style={{ marginTop: 20 }}>
        {stats?.map((item) => {
          const isActive = activeType === item.key;
          return (
            <Col xs={24} sm={12} md={12} lg={6} key={item.key}>
              <Card
                hoverable
                onClick={() => setActiveType(item.key)}
                style={{
                  borderRadius: 16,
                  textAlign: "center",
                  boxShadow: isActive
                    ? "0 6px 20px rgba(24,144,255,0.3)"
                    : "0 4px 10px rgba(0,0,0,0.08)",
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <Statistic
                  title={item.title}
                  value={item.value}
                  prefix={item.icon}
                />
                <Button
                  type="link"
                  onClick={() => navigate(item.path)}
                  icon={<ArrowRightOutlined />}
                >
                  View Details
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Chart + Recent Activity */}
      <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
        {/* Chart Section */}
        <Col xs={24} lg={14}>
          <Card
            title={`Weekly ${
              activeType.charAt(0).toUpperCase() + activeType.slice(1)
            } Activity`}
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1890ff"
                  strokeWidth={2}
                  name="Items"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Recent Table Section */}
        <Col xs={24} lg={10}>
          <Card
            title={`Recent ${
              activeType.charAt(0).toUpperCase() + activeType.slice(1)
            }`}
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              height: "100%",
            }}
            extra={
              <Button type="link" onClick={() => navigate(`/${activeType}`)}>
                View All
              </Button>
            }
          >
            <Table
              dataSource={recentData}
              columns={[
                { title: "Title", dataIndex: "title", key: "title" },
                {
                  title: "Created At",
                  dataIndex: "createdAt",
                  key: "createdAt",
                },
              ]}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminHome;
