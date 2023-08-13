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
  width: 350px;
  margin-right: 2rem;
  display: flex;
  flex-shrink: 0; // This ensures the column never shrinks
`;

const RightColumn = styled.div`
  flex: 1; // This will make it take up the remaining space
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
