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
`;

const Chart = () => {
  const { filter } = useFilter();
  const clicksTimeSeriesData = useClicksTimeSeries(filter);
  const impressionsTimeSeriesData = useImpressionsTimeSeries(filter);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useD3Chart(svgRef, clicksTimeSeriesData, impressionsTimeSeriesData);

  return (
    <Section id="chart">
      <h1>Datasource TODO</h1>
      {clicksTimeSeriesData?.length > 1 && impressionsTimeSeriesData?.length > 1 ? (
        <div>
          <svg ref={svgRef} width="800" height="400"></svg>
        </div>
      ) : (
        <CircularProgress disableShrink />
      )}
    </Section>
  );
};

export default Chart;
