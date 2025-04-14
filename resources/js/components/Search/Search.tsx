import styles from "./Search.module.css";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import ResultsList from "./ResultsList";
import L from "leaflet";
import SearchForm from "./SearchForm";
import SidebarSection from "../Sidebar/SidebarSection";
import { fetchAddressData } from "@/lib/http";

export type AddressData = {
  adressetekst: string;
  adressenavn: string;
  nummer: number;
  gardsnummer: number;
  bruksnummer: number;
  festenummer: number;
  representasjonspunkt: {
    epsg: string;
    lat: number;
    lon: number;
  };
};

const Search = ({ map }: { map: L.Map | null }) => {
  // Fetch data, status and fetch function from custom hook
  const { loading, setFetchedData, fetchedData, error, fetchData } = useFetch<{
    adresser: AddressData[];
  }>();

  // Store form values in state as they are typed in input fields
  const [formValues, setFormValues] = useState({
    gardsnummer: "",
    bruksnummer: "",
    festenummer: "",
    adressenavn: "",
    nummer: "",
  });

  // Fetch address data from Kartverket when form is submitted
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from reloading the page
    fetchData(() => fetchAddressData(formValues));
    console.log("Form submitted with values:", formValues);
  };

  useEffect(() => {
    if (!fetchedData || !map) return;

    const addressArray = fetchedData.adresser;
    let searchLayer: L.FeatureGroup | L.Circle;

    if (addressArray.length === 1) {
      const addressData = addressArray[0];

      // Set form state values to the fetched address
      setFormValues({
        gardsnummer: addressData.gardsnummer.toString(),
        bruksnummer: addressData.bruksnummer.toString(),
        festenummer: addressData.festenummer ? addressData.festenummer.toString() : "",
        adressenavn: addressData.adressenavn ? addressData.adressenavn : "",
        nummer: addressData.nummer ? addressData.nummer.toString() : "",
      });

      // Make yellow circle around the address and fly to location
      const { lat, lon } = addressData.representasjonspunkt;
      searchLayer = L.circle([lat, lon], {
        radius: 15,
        color: "yellow",
        weight: 10,
        opacity: 0.5,
        fillOpacity: 0,
      }).addTo(map);

      map.flyTo([lat, lon], 18);

    } else if (addressArray.length > 0) {

      // Make markers layer from fetched data and add it to the map
      const markersArray: L.Marker[] = [];

      addressArray.forEach((address) => {
        const lat = address.representasjonspunkt.lat;
        const lon = address.representasjonspunkt.lon;

        const marker = L.marker([lat, lon]).bindTooltip(address.adressetekst);
        markersArray.push(marker);
        searchLayer = L.featureGroup(markersArray).addTo(map!);
        map!.flyToBounds(searchLayer.getBounds());
      });
    }

    return () => {
      if (searchLayer) {
        map!.removeLayer(searchLayer);
      }
    };
  }, [fetchedData, map]);

  return (
    <SidebarSection id="søk" title="Søk i eiendommer">
      <SearchForm
        onSubmit={handleSubmit}
        formValues={formValues}
        setFormValues={setFormValues}
        loading={loading}
      />
      <div className={styles.resultsContainer}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {fetchedData && (
          <ResultsList
            addressArray={fetchedData.adresser}
            map={map}
            setFormValues={setFormValues}
            setFetchedData={setFetchedData}
          />
        )}
      </div>
    </SidebarSection>
  );
};

export default Search;
