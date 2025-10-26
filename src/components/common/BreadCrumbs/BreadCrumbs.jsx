import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export default function BreadCrumbs({ items = [], showHome = true }) {
  const homeItem = { key: "home", title: <Link to="/">Home</Link> };

  const breadcrumbItems = items?.map((item, index) => ({
    title: item.path ? (
      <Link to={item.path}>{item.title}</Link>
    ) : (
      <span>{item.title}</span>
    ),
    key: index,
  }));

  const finalItems = showHome
    ? [homeItem, ...breadcrumbItems]
    : breadcrumbItems;

  return (
    <Breadcrumb
      items={finalItems}
      style={{
        margin: "5px 0 16px 0",
        fontSize: 16,
      }}
    />
  );
}
