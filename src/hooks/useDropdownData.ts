import { useEffect, useState } from "react";

const BASE_URL = "https://sandboxportalapi.abiapay.ng/api/v1/";

interface StateOption {
  idstates: number;
  state: string;
}

interface LgaOption {
  lgaID: number;
  lgaName: string;
  stateID: string;
}

interface SectorOption {
  id: number;
  sector_name: string;
}

interface TaxStationOption {
  idstation: number;
  name: string;
  lga: number;
}

interface CdnCategoryOption {
  id: number;
  category_name: string;
}

interface BusinessTypeOption {
  id: number;
  business_type: string;
}

export function useDropdownData() {
  const [states, setStates] = useState<StateOption[]>([]);
  const [lgas, setLgas] = useState<LgaOption[]>([]);
  const [sectors, setSectors] = useState<SectorOption[]>([]);
  const [taxStations, setTaxStations] = useState<TaxStationOption[]>([]);
  const [cdnCategories, setCdnCategories] = useState<CdnCategoryOption[]>([]);
  const [businessTypes, setBusinessTypes] = useState<BusinessTypeOption[]>([]);

  useEffect(() => {
    fetchData<StateOption>("state", setStates, "POST");
    fetchData<LgaOption>("state/lga", setLgas, "POST");
    fetchData<SectorOption>("user/sector", setSectors);
    fetchData<TaxStationOption>("user/station", setTaxStations, "POST");
    fetchData<CdnCategoryOption>("cdn/category", setCdnCategories, "POST");
    fetchData<BusinessTypeOption>("user/business-type", setBusinessTypes);
  }, []);

  const fetchData = async <T>(
    endpoint: string,
    setter: (data: T[]) => void,
    method: "GET" | "POST" = "GET"
  ) => {
    try {
      const res = await fetch(BASE_URL + endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        ...(method === "POST" ? { body: JSON.stringify({}) } : {}),
      });
      const json = await res.json();
      setter(json.data || []);
    } catch (error) {
      console.error("Error fetching", endpoint, error);
    }
  };

  return {
    states,
    lgas,
    sectors,
    taxStations,
    cdnCategories,
    businessTypes,
  };
}
