import { useEffect, useState } from "react";
import _ from "lodash";
import parseCSV from "../utils/parseCsv";
import useDataUrl from "./useDataUrl";

const useCampaigns = (): string[] => {
  const dataUrl = useDataUrl();
  const [campaigns, setCampaigns] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(dataUrl);
      const csvData = await response.text();
      const parsedData = parseCSV(csvData);
      const uniqueCampaigns = _.uniq(parsedData.map((item) => item.campaign));
      setCampaigns(uniqueCampaigns);
    };

    fetchData();
  }, [dataUrl]);

  return campaigns;
};

export default useCampaigns;
