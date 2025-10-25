import { Button } from "antd";

function ReusableHeader(props) {
  const { heading, btnName, buttonClick } = props;
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
        <Button onClick={buttonClick} type="primary">
          {btnName}
        </Button>
      )}
    </div>
  );
}

export default ReusableHeader;
