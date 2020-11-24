import React from "react";
import styled from "styled-components/macro";
import { Shorty } from "../../../types/shorties";

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  overflow-wrap: break-word;
  text-align: left;
  background-color: #ffffff;
  padding: 1em;
  border-radius: 10px;
  border-spacing: 0;

  tbody tr:hover {
    background-color: #ddd;
  }

  th,
  td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.5em;
  }
`;

const createURL = (id: string) => {
  if (window.location.origin.match(/localhost/)) {
    return `http://localhost:3001/${id}`;
  }
  return `${window.location.origin}/${id}`;
};

type Props = {
  shorties: Shorty[];
};
const ShortiesTable = ({ shorties }: Props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Target</th>
          <th>Views</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {shorties.map((shortie) => (
          <tr key={shortie.id}>
            <td>
              <a href={createURL(shortie.id)} target="_blank" rel="noreferrer">
                {shortie.id}
              </a>
            </td>
            <td title={shortie.target}>
              <a href={shortie.target} target="_blank" rel="noreferrer">
                {shortie.target}
              </a>
            </td>
            <td>{shortie.views}</td>
            <td>{shortie.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ShortiesTable;
