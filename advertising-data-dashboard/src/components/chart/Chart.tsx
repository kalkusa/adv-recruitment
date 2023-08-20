import styled from "styled-components";
import { useRef } from "react";
import { useD3Chart } from "../../hooks/useD3Chart";
import { CircularProgress } from "@mui/material";
import { useFilter } from "../../hooks/useFilter";
import useClicksTimeSeries from "../../hooks/useClicksTimeSeries";
import useImpressionsTimeSeries from "../../hooks/useImpressionsTimeSeries";

const Section = styled.section`
  border-width: 1px;
  border-style: solid;
  border-color: #f8f8f8;
  flex: 1;
  padding: 1rem;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 800px;
`;

const Title = styled.h1`
  width: 800px;
`;

const Chart = () => {
  const { filter } = useFilter();
  const [clicksTimeSeriesData, clicksLoading] = useClicksTimeSeries(filter);
  const [impressionsTimeSeriesData, impressionsLoading] = useImpressionsTimeSeries(filter);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isLoading = clicksLoading || impressionsLoading;
  const isDataValid = clicksTimeSeriesData?.length > 2 && impressionsTimeSeriesData?.length > 2;

  useD3Chart(svgRef, clicksTimeSeriesData, impressionsTimeSeriesData);

  const getTitle = () => {
    const selectedDataSourcesLabel =
      filter.dataSources.length > 0
        ? `Datasources: ${filter.dataSources.map((item) => `"${item}"`).join(" and ")}`
        : "All Datasources";
    const selectedCampaignsSourcesLabel =
      filter.campaigns.length > 0
        ? `Campaigns: ${filter.campaigns.map((item) => `"${item}"`).join(" and ")}`
        : "All Campaigns";
    return `${selectedDataSourcesLabel}; ${selectedCampaignsSourcesLabel}`;
  };

  const getChart = () => {
    if (isLoading) {
      return <CircularProgress disableShrink />;
    }

    if (!isDataValid) {
      return <div>Data is not valid.</div>;
    }

    return <svg ref={svgRef} width="800" height="400"></svg>;
  };

  return (
    <Section id="chart">
      <Title>{getTitle()}</Title>
      <ChartContainer>{getChart()}</ChartContainer>
    </Section>
  );
};

export default Chart;
