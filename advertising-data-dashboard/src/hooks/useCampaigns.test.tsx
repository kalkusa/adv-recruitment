import { render, screen, waitFor } from "@testing-library/react";
import { ParsedDataContext } from "../contexts/ParsedDataContext";
import useCampaigns from "./useCampaigns";

const mockData = [
  {
    date: new Date("01.01.2019"),
    datasource: "Facebook Ads",
    campaign: "Like Ads",
    clicks: 274,
    impressions: 1979,
  },
  {
    date: new Date("01.01.2019"),
    datasource: "Google Adwords",
    campaign: "B2B - Leads",
    clicks: 7,
    impressions: 444,
  },
];

const TestComponent = ({ dataSources }: { dataSources: string[] }) => {
  const campaigns = useCampaigns(dataSources);
  return <div data-testid="campaigns">{campaigns.join(", ")}</div>;
};

describe("useCampaigns", () => {
  it("should fetch and return all campaigns if no data source is provided", async () => {
    render(
      <ParsedDataContext.Provider value={mockData}>
        <TestComponent dataSources={[]} />
      </ParsedDataContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("campaigns").textContent).toBe("Like Ads, B2B - Leads");
    });
  });

  it("should fetch and return campaigns filtered by data source", async () => {
    render(
      <ParsedDataContext.Provider value={mockData}>
        <TestComponent dataSources={["Facebook Ads"]} />
      </ParsedDataContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("campaigns").textContent).toBe("Like Ads");
    });
  });
});
