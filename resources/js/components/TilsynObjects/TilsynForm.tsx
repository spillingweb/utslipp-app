import { FilterContext } from '@/store/filter-context';
import { SelectedPointContext } from '@/store/selected-point-context';
import { SidebarContext } from '@/store/sidebar-context';
import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { use } from 'react';
import SidebarSection from '../Sidebar/SidebarSection';
import Button from '../ui/Button';
import Form from '../ui/Form';
import { Input } from '../ui/Input';
import styles from './TilsynForm.module.css';
import TilsynFormFieldset from './TilsynFormFieldset';

const TilsynForm = () => {
    const { can } = usePage<SharedData>().props;
    const { selectedPoint, setSelectedPoint } = use(SelectedPointContext);
    const { sidebarTabOpen } = use(SidebarContext);
    const { setFilterValue } = use(FilterContext);

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
            setFilterValue('tilsyn'); // Reset filter to default after creating a new object
        } else {
            updateTilsynObject();
        }
    };

    const title = open ? `${data.gnr}/${data.bnr}${data.fnr ? `/${data.fnr}` : ''} ${data.adresse}` : 'Tilsynsobjekt';

    const Buttons = () => {
        // Don't show buttons if user doesn't have edit permission
        if (!can.tilsyn_object_edit) return null;

        // Show edit and delete buttons if form is disabled
        if (disabled) {
            return (
                <div className={styles.cta}>
                    <Button type="button" onClick={() => setTilsynFormProperties({ open: true, disabled: false, mode: 'edit' })}>
                        Rediger
                    </Button>
                    <Button type="button" onClick={handleDeleteTilsynObject} variant="secondary">
                        Slett
                    </Button>
                </div>
            );
        }

        // If form is not disabled, show buttons depending on the form state
        return (
            <div className={styles.cta}>
                <Button type="submit" disabled={processing}>
                    {mode == 'create' ? 'Legg til nytt tilsynsobjekt' : 'Lagre endringer'}
                </Button>
                <Button type="reset" variant="secondary" onClick={handleCancelTilsynForm}>
                    Avbryt
                </Button>
            </div>
        );
    };

    return (
        <SidebarSection isOpen={sidebarTabOpen === 'tilsyn'} title={title}>
            {open === false &&
                (can.tilsyn_object_edit ? (
                    <div>
                        Velg et tilsynsobjekt på kartet for å vise/redigere, eller høyreklikk på en eiendom for å opprette et nytt tilsynsobjekt.
                    </div>
                ) : (
                    <div>Klikk på et tilsynsobjekt på kartet for å se informasjon om eiendommen.</div>
                ))}
            {open === true && (
                <Form flex={false} onSubmit={handleSubmitForm}>
                    <div hidden>
                        <label htmlFor="lat">Latitude</label>
                        <Input id="lat" type="number" value={selectedPoint?.lat || ''} readOnly disabled />
                        <label htmlFor="lng">Longitude</label>
                        <Input id="lng" type="number" value={selectedPoint?.lng || ''} readOnly disabled />
                    </div>
                    <TilsynFormFieldset data={data} disabled={disabled} setData={setData} />
                    <Buttons />
                    {disabled && (
                        <p className={styles.lastUpdated}>
                            Sist oppdatert {data.updated_at} av {data.endret_av}
                        </p>
                    )}
                </Form>
            )}
        </SidebarSection>
    );
};

export default TilsynForm;
