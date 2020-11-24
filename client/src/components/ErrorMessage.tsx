import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";

const Container = styled.div`
  color: red;
`;

const ErrorMessage = ({ message }) => <Container>💀 {message}</Container>;

ErrorMessage.propTypes = {
  message: PropTypes.string,
};
export default ErrorMessage;
