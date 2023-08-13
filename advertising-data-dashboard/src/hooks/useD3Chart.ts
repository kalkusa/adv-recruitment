import { useEffect } from "react";
import { line as d3line, select, scaleTime, extent, scaleLinear, scaleOrdinal, axisBottom, max, axisLeft } from "d3";
import { ValueInTime } from "../types/chartTypes";

const setupScales = (data: ValueInTime[], width: number, height: number, margin: any) => {
  const xScale = scaleTime()
    .domain(extent(data, (d) => d.date) as [Date, Date])
    .range([margin.left, width - margin.right]);

  const yScale = scaleLinear()
    .domain([0, max(data, (d) => d.value) as number])
    .nice()
    .range([height - margin.bottom, margin.top]);

  return { xScale, yScale };
};

const drawXAxis = (svg: any, xScale: any, height: number, margin: any) => {
  const xAxis = axisBottom(xScale);
  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);
};

const drawYAxis = (svg: any, yScale: any, height: number, margin: any) => {
  const yAxis = axisLeft(yScale);
  svg.append("g").attr("transform", `translate(${margin.left},0)`).call(yAxis);

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 16)
    .attr("x", 0 - height / 2)
    .attr("dy", "1rem")
    .style("text-anchor", "middle")
    .text("Clicks");
};

const drawLineChart = (svg: any, data: ValueInTime[], xScale: any, yScale: any) => {
  const line = d3line<ValueInTime>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));

  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line);
};

const drawLegend = (svg: any, width: number) => {
  const color = scaleOrdinal<string, string>().domain(["Clicks"]).range(["#1f77b4"]);

  const legend = svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("transform", (d: any, i: number) => `translate(0,${i * 20})`);

  legend
    .append("rect")
    .attr("x", width - 19)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", color);

  legend
    .append("text")
    .attr("x", width - 24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text((d: any) => d);
};

export const useD3Chart = (svgRef: React.RefObject<SVGSVGElement>, timeSeriesData: ValueInTime[]) => {
  useEffect(() => {
    if (svgRef.current && timeSeriesData.length) {
      const svg = select(svgRef.current);
      const width = 800;
      const height = 400;
      const margin = { top: 20, right: 80, bottom: 30, left: 80 };

      const { xScale, yScale } = setupScales(timeSeriesData, width, height, margin);
      drawXAxis(svg, xScale, height, margin);
      drawYAxis(svg, yScale, height, margin);
      drawLineChart(svg, timeSeriesData, xScale, yScale);
      drawLegend(svg, width);
    }
  }, [svgRef, timeSeriesData]);
};
