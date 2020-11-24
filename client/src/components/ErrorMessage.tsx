import React from "react";
import styled from "styled-components/macro";

const Container = styled.div`
  color: red;
`;

type Props = {
  message: string;
};
const ErrorMessage = ({ message }: Props) => (
  <Container>💀 {message}</Container>
);

export default ErrorMessage;
