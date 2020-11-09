import { Spin } from "antd";
import { css } from "@emotion/css";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;

export const Spinner = ({ spinning, children }) => {
  return (
    <Container>
      <Spin spinning={spinning}>{children}</Spin>
    </Container>
  );
};
