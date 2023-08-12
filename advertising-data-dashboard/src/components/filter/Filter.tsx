import styled from "styled-components";

const Section = styled.section`
  background-color: #def7ff;
  border-width: 1px;
  border-style: solid;
  border-color: #f8f8f8;
  flex: 1;
`;

const Filter = () => {
  return (
    <Section id="filter">
      <h1>Filter dimention values</h1>
      <h2>Datasource</h2>
      <h2>Campaign</h2>
    </Section>
  );
};

export default Filter;
