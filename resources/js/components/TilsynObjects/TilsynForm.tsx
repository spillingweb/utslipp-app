import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { LatLngLiteral } from 'leaflet';
import { use } from 'react';
import SidebarSection from '../Sidebar/SidebarSection';
import Button from '../ui/Button';
import Form from '../ui/Form';
import { Input } from '../ui/Input';
import styles from './TilsynForm.module.css';
import TilsynFormFieldset from './TilsynFormFieldset';
import { SidebarTab } from '../Sidebar/Sidebar';

type TilsynFormProps = {
    isOpen: boolean;
    selectedPoint: LatLngLiteral | null;
    setSelectedPoint: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
    setSidebarTabOpen: React.Dispatch<React.SetStateAction<SidebarTab | null>>;
};

const TilsynForm = ({ isOpen, setSelectedPoint, selectedPoint, setSidebarTabOpen }: TilsynFormProps) => {
    // Access the TilsynFormContext to get form data and properties
    const {
        data,
        setData,
        tilsynFormProperties,
        setTilsynFormProperties,
        storeTilsynObject,
        updateTilsynObject,
        deleteTilsynObject,
        processing,
        cancel,
    } = use(TilsynFormContext);
    const { disabled, open, mode } = tilsynFormProperties;

    const handleCancelTilsynForm = () => {
        cancel(); // Reset form data
        setTilsynFormProperties({ open: false, disabled: true, mode: 'create' }); // Reset form properties
        setSelectedPoint(null); // Reset selected point on the map
    };

    const handleDeleteTilsynObject = () => {
        if (confirm(`Er du sikker på at du vil slette tilsynsobjektet? Det kan ikke angres.`)) {
            deleteTilsynObject();
            setSelectedPoint(null); // Reset selected point on the map
        }
    };

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'create') {
            storeTilsynObject();
        } else {
            updateTilsynObject();
        }
    };

    const title = open ? `${data.gnr}/${data.bnr}${data.fnr ? `/${data.fnr}` : ''} ${data.adresse}` : 'Tilsynsobjekt';

    return (
        <SidebarSection isOpen={isOpen} title={title} setSidebarTabOpen={setSidebarTabOpen}>
            {open === false && (
                <div>Velg et tilsynsobjekt på kartet for å vise/redigere, eller høyreklikk på en eiendom for å opprette et nytt tilsynsobjekt.</div>
            )}
            {open === true && (
                <Form onSubmit={handleSubmitForm}>
                    <div hidden>
                        <label htmlFor="lat">Latitude</label>
                        <Input id="lat" type="number" value={selectedPoint?.lat || ''} readOnly disabled />

                        <label htmlFor="lng">Longitude</label>
                        <Input id="lng" type="number" value={selectedPoint?.lng || ''} readOnly disabled />
                    </div>
                    <TilsynFormFieldset data={data} disabled={disabled} setData={setData} />
                    {disabled && (
                        <div className={styles.cta}>
                            <Button type="button" onClick={() => setTilsynFormProperties({ open: true, disabled: false, mode: 'edit' })}>
                                Rediger
                            </Button>
                            <Button type="button" onClick={handleDeleteTilsynObject} variant="secondary">
                                Slett
                            </Button>
                        </div>
                    )}
                    {!disabled && mode == 'create' && (
                        <div className={styles.cta}>
                            <Button type="submit" disabled={processing}>
                                Legg til nytt tilsynsobjekt
                            </Button>
                            <Button type="reset" variant="secondary" onClick={handleCancelTilsynForm}>
                                Avbryt
                            </Button>
                        </div>
                    )}
                    {!disabled && mode == 'edit' && (
                        <div className={styles.cta}>
                            <Button type="submit" disabled={processing}>
                                Lagre endringer
                            </Button>
                            <Button type="reset" variant="secondary" onClick={handleCancelTilsynForm}>
                                Avbryt
                            </Button>
                        </div>
                    )}
                </Form>
            )}
        </SidebarSection>
    );
};

export default TilsynForm;
