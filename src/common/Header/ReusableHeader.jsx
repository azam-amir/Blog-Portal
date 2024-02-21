import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function ReusableHeader(props) {
  const { heading, btnName, click } = props;
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: "white",
        borderRadius: "10px",
        height: "55px",
        marginTop: "-30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 30px 0px 25px",
      }}
    >
      <h1 style={{ paddingBottom: "4px" }}>{heading}</h1>
      {btnName === "none" ? (
        ""
      ) : (
        <Button
          onClick={
            click === "category"
              ? () => navigate("/category_add_edit")
              : () => {}
          }
          type="primary"
        >
          {btnName}
        </Button>
      )}
    </div>
  );
}

export default ReusableHeader;
