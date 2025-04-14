import Heading from "../ui/Heading";
import styles from "./ResultsList.module.css";
import { AddressData } from "./Search";

type ResultsListProps = {
  addressArray: AddressData[];
  map: L.Map | null;
  setFormValues: React.Dispatch<
    React.SetStateAction<{
      gardsnummer: string;
      bruksnummer: string;
      festenummer: string;
      adressenavn: string;
      nummer: string;
    }>
  >;
  setFetchedData: React.Dispatch<
    React.SetStateAction<
      | {
          adresser: AddressData[];
        }
      | undefined
    >
  >;
};

const ResultsList = ({
  addressArray,
  map,
  setFormValues,
  setFetchedData,
}: ResultsListProps) => {
  // Fly to clicked address and update form values
  const handleClick = (address: AddressData) => {
    const {
      gardsnummer,
      bruksnummer,
      festenummer,
      adressenavn,
      nummer,
      representasjonspunkt,
    } = address;

    // Update state form values with the selected address, so form is filled with all the information
    setFormValues((prevValues) => ({
      ...prevValues,
      gardsnummer: gardsnummer.toString(),
      bruksnummer: bruksnummer.toString(),
      festenummer: festenummer ? festenummer.toString() : "",
      adressenavn: adressenavn ? adressenavn : "",
      nummer: nummer ? nummer.toString() : "",
    }));

    // Go to the address on the map
    const { lat, lon } = representasjonspunkt;
    
    if (map) {
      map.flyTo([lat, lon], 18);
    }

    // Change fetchedData so it contains only the clicked address, so the results list is removed
    setFetchedData({ adresser: [address] });
  };

  if (addressArray.length === 0) {
    return (
      <p className={styles.noResults}>
        Fant ingen adresser med de oppgitte søkekriteriene
      </p>
    );
  }

  if (addressArray.length > 1) {
    return (
      <div className={styles.resultsContainer}>
        <Heading level={2}>Hvilken eiendom søker du etter?</Heading>
        <ul className={styles.resultsList}>
          {addressArray.map((address) => {
            const { gardsnummer, bruksnummer, festenummer, adressetekst } =
              address;
            return (
              <li key={adressetekst}>
                <a
                  href="#søk"
                  onClick={() => handleClick(address)}
                >{`${gardsnummer}/${bruksnummer}${
                  festenummer != 0 ? `/${festenummer}` : ""
                } - ${adressetekst}`}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return;
};

export default ResultsList;
