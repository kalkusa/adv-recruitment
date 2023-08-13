import styled from "styled-components";
import useTimeSeries from "../../hooks/useTimeSeries";
import { useRef } from "react";
import { useD3Chart } from "../../hooks/useD3Chart";
import { CircularProgress } from "@mui/material";
import { useFilter } from "../../hooks/useFilter";

const Section = styled.section`
  border-width: 1px;
  border-style: solid;
  border-color: #f8f8f8;
  flex: 1;
`;

const Chart = () => {
  const { filter } = useFilter();
  const timeSeriesData = useTimeSeries(filter);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useD3Chart(svgRef, timeSeriesData);

  return (
    <Section id="chart">
      <h1>Datasource TODO</h1>
      {timeSeriesData?.length > 1 ? (
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
