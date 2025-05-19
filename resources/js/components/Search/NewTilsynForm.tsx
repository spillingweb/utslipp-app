import { AddressData } from '@/pages/Map';
import Form from '../ui/Form';
import Input from '../ui/Input';

const NewTilsynForm = ({ addressData }: { addressData: AddressData }) => {
    const { adressetekst, gardsnummer, bruksnummer, festenummer } = addressData;

    return (
        <Form onSubmit={() => console.log('Form submitted')}>
            <h1>{adressetekst}</h1>
            <label htmlFor="name">Name</label>
            <Input type="text" id="name" />
        </Form>
    );
};

export default NewTilsynForm;
