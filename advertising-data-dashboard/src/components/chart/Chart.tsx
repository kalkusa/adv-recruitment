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
  const clicksTimeSeriesData = useClicksTimeSeries(filter);
  const impressionsTimeSeriesData = useImpressionsTimeSeries(filter);
  const svgRef = useRef<SVGSVGElement | null>(null);

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

  return (
    <Section id="chart">
      <Title>{getTitle()}</Title>
      <ChartContainer>
        {clicksTimeSeriesData?.length > 1 && impressionsTimeSeriesData?.length > 1 ? (
          <svg ref={svgRef} width="800" height="400"></svg>
        ) : (
          <CircularProgress disableShrink />
        )}
      </ChartContainer>
    </Section>
  );
};

export default Chart;
