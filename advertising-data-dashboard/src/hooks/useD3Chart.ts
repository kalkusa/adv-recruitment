import { useEffect } from "react";
import {
  line as d3line,
  select,
  scaleTime,
  extent,
  scaleLinear,
  scaleOrdinal,
  axisBottom,
  max,
  axisLeft,
  axisRight,
} from "d3";
import { ValueInTime } from "../types/chartTypes";

const setupClicksYScale = (data: ValueInTime[], height: number, margin: any) => {
  return scaleLinear()
    .domain([0, max(data, (d) => d.value) as number])
    .nice()
    .range([height - margin.bottom, margin.top]);
};

const setupImpressionsYScale = (data: ValueInTime[], height: number, margin: any) => {
  return scaleLinear()
    .domain([0, max(data, (d) => d.value) as number])
    .nice()
    .range([height - margin.bottom, margin.top]);
};

const drawXAxis = (svg: any, xScale: any, height: number, margin: any) => {
  const xAxis = axisBottom(xScale);
  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);
};

const drawClicksYAxis = (svg: any, yScale: any, width: number, height: number, margin: any) => {
  const yAxis = axisLeft(yScale);
  svg.append("g").attr("transform", `translate(${margin.left},0)`).attr("class", "y-axis").call(yAxis);

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 16)
    .attr("x", 0 - height / 2 + 15)
    .attr("dy", "1rem")
    .style("text-anchor", "middle")
    .text("Clicks");

  svg
    .selectAll(".y-axis .tick line")
    .filter((d: any, i: number) => i !== 0) // Exclude the first tick line (actually last)
    .attr("stroke", "#f0f0f0")
    .attr("x1", 1) // Tick line left padding
    .attr("x2", width - 160); // Tick line width
};

const drawImpressionsYAxis = (svg: any, yScale: any, width: number, height: number, margin: any) => {
  const yAxis = axisRight(yScale).tickFormat((d) => `${d}`);
  svg
    .append("g")
    .attr("transform", `translate(${width - margin.right},0)`)
    .call(yAxis);

  svg
    .append("text")
    .attr("transform", "rotate(90)")
    .attr("y", -width + margin.right - 80)
    .attr("x", height / 2 - 20)
    .attr("dy", "1rem")
    .style("text-anchor", "middle")
    .text("Impressions");
};

const drawClicksLineChart = (svg: any, data: ValueInTime[], xScale: any, yScale: any) => {
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

const drawImpressionsLineChart = (svg: any, data: ValueInTime[], xScale: any, yScale: any) => {
  const line = d3line<ValueInTime>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));

  svg.append("path").datum(data).attr("fill", "none").attr("stroke", "green").attr("stroke-width", 1.5).attr("d", line);
};

const drawLegend = (svg: any) => {
  const clicksLegendColor = "#1f77b4";
  const impressionsLegendColor = "green";
  const legendColors = scaleOrdinal<string, string>()
    .domain(["Clicks", "Impressions"])
    .range([clicksLegendColor, impressionsLegendColor]);

  const legendSpacing = 75;

  const legend = svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "start")
    .selectAll("g")
    .data(legendColors.domain())
    .enter()
    .append("g")
    .attr("transform", (d: any, i: number) => `translate(${i * legendSpacing}, 360)`);

  legend.append("rect").attr("x", 340).attr("y", 0).attr("width", 19).attr("height", 19).attr("fill", legendColors);

  legend
    .append("text")
    .attr("x", 365)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text((d: any) => d);
};

export const useD3Chart = (
  svgRef: React.RefObject<SVGSVGElement>,
  clicksTimeSeriesData: ValueInTime[],
  impressionsTimeSeriesData: ValueInTime[]
) => {
  useEffect(() => {
    if (svgRef.current && clicksTimeSeriesData.length && impressionsTimeSeriesData.length) {
      const svg = select(svgRef.current);
      svg.selectAll("*").remove();
      const width = 800;
      const height = 380;
      const margin = { top: 10, right: 80, bottom: 50, left: 80 };

      const xScale = scaleTime()
        .domain(extent([...clicksTimeSeriesData, ...impressionsTimeSeriesData], (d) => d.date) as [Date, Date])
        .range([margin.left, width - margin.right]);

      const clicksYScale = setupClicksYScale(clicksTimeSeriesData, height, margin);
      const impressionsYScale = setupImpressionsYScale(impressionsTimeSeriesData, height, margin);

      drawXAxis(svg, xScale, height, margin);
      drawClicksYAxis(svg, clicksYScale, width, height, margin);
      drawImpressionsYAxis(svg, impressionsYScale, width, height, margin);

      drawClicksLineChart(svg, clicksTimeSeriesData, xScale, clicksYScale);
      drawImpressionsLineChart(svg, impressionsTimeSeriesData, xScale, impressionsYScale);

      drawLegend(svg);
    }
  }, [svgRef, clicksTimeSeriesData, impressionsTimeSeriesData]);
};
