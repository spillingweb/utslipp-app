import { AddressData } from '@/types';
import Heading from '../ui/Heading';
import styles from './ResultsList.module.css';

type ResultsListProps = {
    addressArray: AddressData[];
    setFetchedData: React.Dispatch<
        React.SetStateAction<{
            adresser: AddressData[];
        } | null>
    >;
};

const ResultsList = ({ addressArray, setFetchedData }: ResultsListProps) => {
    // If no addresses are found, display a message
    if (addressArray.length === 0) {
        return <p className={styles.noResults}>Fant ingen adresser med de oppgitte søkekriteriene</p>;
    }

    // If there are multiple addresses, display a list of them
    if (addressArray.length > 1) {
        return (
            <div className={styles.resultsContainer}>
                <Heading level={2}>Hvilken eiendom søker du etter?</Heading>
                <ul className={styles.resultsList}>
                    {addressArray.map((address) => {
                        const { gardsnummer, bruksnummer, festenummer, adressetekst } = address;
                        return (
                            <li key={adressetekst}>
                                <a href="#" onClick={() => setFetchedData({ adresser: [address] })}>{`${gardsnummer}/${bruksnummer}${
                                    festenummer != '0' ? `/${festenummer}` : ''
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
