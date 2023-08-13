import { Autocomplete, Button, TextField } from "@mui/material";
import styled from "styled-components";
import useDatasources from "../../hooks/useDatasources";

const Section = styled.section`
  background-color: #def7ff;
  border-width: 1px;
  border-style: solid;
  border-color: #f8f8f8;
  flex: 1;
  padding: 1rem;
`;

const Filter = () => {
  const dataSources = useDatasources();

  return (
    <Section id="filter">
      <h1>Filter dimention values</h1>
      <Autocomplete
        multiple
        id="tags-readOnly"
        options={dataSources}
        renderInput={(params) => <TextField {...params} label="Data sources" placeholder="Data source" />}
      />
      <h2>Campaign</h2>
      <p>todo</p>
      <Button variant="contained">Apply</Button>
    </Section>
  );
};

export default Filter;
