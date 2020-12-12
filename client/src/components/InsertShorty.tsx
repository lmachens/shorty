import React, { useState } from "react";
import PropTypes from "prop-types";
import { postNewShorty } from "../api/shorties";
import styled from "styled-components/macro";
import ErrorMessage from "./ErrorMessage";
import { NewShorty } from "../../../types/shorties";
import { useDict } from "../contexts/i18n";

const Form = styled.form`
  padding: 1em;

  *:not(:last-child) {
    margin-right: 1em;
  }

  label > input {
    margin-left: 0.5em;
  }
`;

const newShorty: NewShorty = {
  id: "",
  target: "",
};
const InsertShorty = ({ onSuccess }) => {
  const [shorty, setShorty] = useState<NewShorty>(newShorty);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>(null);
  const dict = useDict();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setError(null);
      setLoading(true);
      await postNewShorty(shorty);
      onSuccess();
      setShorty(newShorty);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShorty({ ...shorty, [key]: event.target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        {dict.id}
        <input
          value={shorty.id}
          onChange={handleChange("id")}
          placeholder={dict.idPlaceholder}
        />
      </label>
      <label>
        {dict.target}
        <input
          value={shorty.target}
          onChange={handleChange("target")}
          placeholder={dict.targetPlaceholder}
        />
      </label>
      <input
        type="submit"
        value={loading ? dict.loading : dict.insert}
        disabled={loading}
      />
      {error && <ErrorMessage message={error.message} />}
    </Form>
  );
};

InsertShorty.propTypes = {
  onSuccess: PropTypes.func,
};

export default InsertShorty;
