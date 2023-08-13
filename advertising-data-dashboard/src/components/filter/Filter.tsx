import { Autocomplete, Chip, TextField } from "@mui/material";
import styled from "styled-components";
import useDatasources from "../../hooks/useDatasources";
import useCampaigns from "../../hooks/useCampaigns";
import { Filter as FilterType } from "../../types/chartTypes";
import { useFilter } from "../../hooks/useFilter";

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
  const { setFilter } = useFilter();

  const handleDataSourceChange = (event: any, newValue: any) => {
    setFilter((prev: FilterType) => ({ ...prev, dataSources: newValue }));
  };

  const handleCampaignChange = (event: any, newValue: any) => {
    setFilter((prev: FilterType) => ({ ...prev, campaigns: newValue }));
  };

  const renderTags = (value: string[], getTagProps: any) => {
    return value.map((option: string, index: number) => {
      let displayText = option.length > 30 ? option.slice(0, 27) + "..." : option;
      return <Chip variant="outlined" label={displayText} {...getTagProps({ index })} />;
    });
  };

  return (
    <Section id="filter">
      <h1>Filter dimention values</h1>
      <Autocomplete
        multiple
        id="dataSources"
        options={dataSources}
        renderInput={(params) => <TextField {...params} label="Data sources" placeholder="Select data source" />}
        onChange={handleDataSourceChange}
        renderTags={renderTags}
      />
      <h2>Campaign</h2>
      <Autocomplete
        multiple
        id="campaigns"
        options={campaigns}
        renderInput={(params) => <TextField {...params} label="Campaigns" placeholder="Select campaign" />}
        onChange={handleCampaignChange}
        renderTags={renderTags}
      />
      {/* <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" sx={{ mt: 3 }}>
          Apply
        </Button>
      </Box> */}
    </Section>
  );
};

export default Filter;
