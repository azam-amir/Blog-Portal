import { Button, Col, Row, Table } from "antd";
import React from "react";

function GridViewTable(props) {
  const {
    heading = "",
    addBtnText = false,
    addBtnClick = () => {},
    ...otherProps
  } = props;
  return (
    <div>
      <Row
        type="flex"
        justify="space-between"
        align="middle"
        style={{ marginBottom: "20px" }}
      >
        <Col>
          <h3
            style={{
              marginBottom: "0",
              marginTop: "0",
            }}
          >
            {heading}
          </h3>
        </Col>
        <Col>
          {addBtnText && (
            <Button type="primary" onClick={addBtnClick}>
              {addBtnText}
            </Button>
          )}
        </Col>
      </Row>

      <Table {...otherProps} />
    </div>
  );
}

export default GridViewTable;
