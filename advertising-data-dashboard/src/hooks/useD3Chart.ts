import { useEffect } from "react";
import { line as d3line, select, scaleTime, extent, scaleLinear, scaleOrdinal, axisBottom, max, axisLeft } from "d3";
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

const drawClicksYAxis = (svg: any, yScale: any, height: number, margin: any) => {
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

const drawImpressionsYAxis = (svg: any, yScale: any, width: number, height: number, margin: any) => {
  const yAxis = axisLeft(yScale).tickFormat((d) => `${d}`);
  svg
    .append("g")
    .attr("transform", `translate(${width - margin.right},0)`)
    .call(yAxis);

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", width - margin.left + 20)
    .attr("x", 0 - height / 2)
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

const drawLegend = (svg: any, width: number) => {
  const clicksLegendColor = "#1f77b4";
  const impressionsLegendColor = "green";
  const legendColors = scaleOrdinal<string, string>()
    .domain(["Clicks", "Impressions"])
    .range([clicksLegendColor, impressionsLegendColor]);

  const legend = svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(legendColors.domain())
    .enter()
    .append("g")
    .attr("transform", (d: any, i: number) => `translate(0,${i * 20})`);

  legend
    .append("rect")
    .attr("x", width - 19)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", legendColors);

  legend
    .append("text")
    .attr("x", width - 24)
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
      const height = 400;
      const margin = { top: 20, right: 80, bottom: 30, left: 80 };

      const xScale = scaleTime()
        .domain(extent([...clicksTimeSeriesData, ...impressionsTimeSeriesData], (d) => d.date) as [Date, Date])
        .range([margin.left, width - margin.right]);

      const clicksYScale = setupClicksYScale(clicksTimeSeriesData, height, margin);
      const impressionsYScale = setupImpressionsYScale(impressionsTimeSeriesData, height, margin);

      drawXAxis(svg, xScale, height, margin);
      drawClicksYAxis(svg, clicksYScale, height, margin);
      drawImpressionsYAxis(svg, impressionsYScale, width, height, margin);

      drawClicksLineChart(svg, clicksTimeSeriesData, xScale, clicksYScale);
      drawImpressionsLineChart(svg, impressionsTimeSeriesData, xScale, impressionsYScale);

      drawLegend(svg, width);
    }
  }, [svgRef, clicksTimeSeriesData, impressionsTimeSeriesData]);
};
