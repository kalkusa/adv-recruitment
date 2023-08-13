import { Autocomplete, Box, Button, TextField } from "@mui/material";
import styled from "styled-components";
import useDatasources from "../../hooks/useDatasources";
import useCampaigns from "../../hooks/useCampaigns";

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
  const campaigns = useCampaigns();

  return (
    <Section id="filter">
      <h1>Filter dimention values</h1>
      <Autocomplete
        multiple
        id="tags-readOnly"
        options={dataSources}
        renderInput={(params) => <TextField {...params} label="Data sources" placeholder="Select data source" />}
      />
      <h2>Campaign</h2>
      <Autocomplete
        multiple
        id="tags-readOnly"
        options={campaigns}
        renderInput={(params) => <TextField {...params} label="Campaigns" placeholder="Select campaign" />}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" sx={{ mt: 3 }}>
          Apply
        </Button>
      </Box>
    </Section>
  );
};

export default Filter;
