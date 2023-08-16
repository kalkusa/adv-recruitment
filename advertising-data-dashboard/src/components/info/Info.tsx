import styled from "styled-components";

const Section = styled.section`
  border-width: 1px;
  border-style: solid;
  border-color: #f8f8f8;
`;

const Info = () => {
  return (
    <Section id="info">
      <ul>
        <li>Select zero to N Datasources</li>
        <li>Select zero to N Campaigns</li>
      </ul>
      <p>(where zero means "All")</p>
      {/* <p>
        Hitting "Apply", filters the chart to show a timeseries for both Clicks and Impressions for given Datasources
        and Campaigns - logical AND
      </p> */}
      <p>
        The chart shows a timeseries for both Clicks and Impressions for given Datasources and Campaigns - logical AND
      </p>
    </Section>
  );
};

export default Info;
