const Info = () => {
  return (
    <section id="info">
      <ul>
        <li>Select zero to N Datasources</li>
        <li>Select zero to N Campaigns</li>
      </ul>
      <p>(where zero means "All")</p>
      <p>
        Hitting "Apply", filters the chart to show a timeseries for both Clicks and Impressions for given Datasources
        and Campaigns - logical AND
      </p>
    </section>
  );
};

export default Info;
