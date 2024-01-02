import { Flex, Spin } from "antd";

export default function Loading() {
  const loadingStyle = {
    padding: 50,
    borderRadius: 4,
  };

  return (
    <Flex gap="small">
      <Spin tip="Loading" size="large">
        <div className="content" style={loadingStyle} />
      </Spin>
    </Flex>
  );

  }