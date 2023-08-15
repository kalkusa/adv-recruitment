import { Autocomplete, Chip, Skeleton, TextField } from "@mui/material";
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

const AutocompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 60px;
  margin-bottom: 1rem;
`;

const AutocompleteSkeleton = styled(Skeleton)`
  flex-grow: 1;
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
      <h1>Filter dimension values</h1>

      <AutocompleteContainer>
        {dataSources.length === 0 ? (
          <AutocompleteSkeleton variant="rounded" />
        ) : (
          <Autocomplete
            multiple
            id="dataSources"
            options={dataSources}
            renderInput={(params) => <TextField {...params} label="Data sources" placeholder="Select data source" />}
            onChange={handleDataSourceChange}
            renderTags={renderTags}
          />
        )}
      </AutocompleteContainer>
      <AutocompleteContainer>
        {campaigns.length === 0 ? (
          <AutocompleteSkeleton variant="rounded" />
        ) : (
          <Autocomplete
            multiple
            id="campaigns"
            options={campaigns}
            renderInput={(params) => <TextField {...params} label="Campaigns" placeholder="Select campaign" />}
            onChange={handleCampaignChange}
            renderTags={renderTags}
          />
        )}
      </AutocompleteContainer>
    </Section>
  );
};

export default Filter;
