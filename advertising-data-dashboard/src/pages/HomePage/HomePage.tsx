import Chart from "../../components/chart/Chart";
import Filter from "../../components/filter/Filter";
import Info from "../../components/info/Info";
import styled from "styled-components";

const ChartContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  height: 500px;
`;

const LeftColumn = styled.div`
  width: 20%;
  margin-right: 2rem;
  display: flex;
`;

const RightColumn = styled.div`
  width: 80%;
  display: flex;
`;

const HomePage = () => {
  return (
    <>
      <h1>Adverity Advertising Data ETL-V Challenge</h1>
      <Info />
      <ChartContainer>
        <LeftColumn>
          <Filter />
        </LeftColumn>
        <RightColumn>
          <Chart />
        </RightColumn>
      </ChartContainer>
    </>
  );
};

export default HomePage;
