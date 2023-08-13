import styled from "styled-components";
import useTimeSeries from "../../hooks/useTimeSeries";
import { useEffect, useRef } from "react";
import { line as d3line, select, scaleTime, extent, scaleLinear, axisBottom, max, axisLeft } from "d3";
import { ValueInTime } from "../../types/chartTypes";

const Section = styled.section`
  border-width: 1px;
  border-style: solid;
  border-color: #f8f8f8;
  flex: 1;
`;

const Chart = () => {
  const timeSeriesData = useTimeSeries();
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = select(svgRef.current);

      // Set dimensions
      const width = 800;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };

      // Create scales
      const xScale = scaleTime()
        .domain(extent(timeSeriesData, (d) => d.date) as [Date, Date])
        .range([margin.left, width - margin.right]);

      const yScale = scaleLinear()
        .domain([0, max(timeSeriesData, (d) => d.value) as number])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Create axes
      const xAxis = axisBottom(xScale);
      const yAxis = axisLeft(yScale);

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis);

      svg.append("g").attr("transform", `translate(${margin.left},0)`).call(yAxis);

      // Create line
      const line = d3line<ValueInTime>()
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.value));

      svg
        .append("path")
        .datum(timeSeriesData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    }
  }, [timeSeriesData]);

  return (
    <Section id="chart">
      <h1>Datasource TODO</h1>
      {timeSeriesData?.length > 1 ? (
        <div>
          <svg ref={svgRef} width="800" height="400"></svg>
        </div>
      ) : (
        <div>Loading time series data</div>
      )}
    </Section>
  );
};

export default Chart;
