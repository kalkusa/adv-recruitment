import { useEffect, useState } from "react";
import _ from "lodash";
import parseCSV from "../utils/parseCsv";

const useCampaigns = (): string[] => {
  const [campaigns, setCampaigns] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.PUBLIC_URL + "/assets/data.csv");
      const csvData = await response.text();
      const parsedData = parseCSV(csvData);
      const uniqueCampaigns = _.uniq(parsedData.map((item) => item.campaign));
      setCampaigns(uniqueCampaigns);
    };

    fetchData();
  }, []);

  return campaigns;
};

export default useCampaigns;
