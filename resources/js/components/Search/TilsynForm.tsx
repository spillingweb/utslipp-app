import { TILSYN_STATUS } from '@/lib/tilsynStatus';
import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { TilsynObject, User } from '@/types';
import { usePage } from '@inertiajs/react';
import { LatLngLiteral } from 'leaflet';
import { use } from 'react';
import SidebarSection from '../Sidebar/SidebarSection';
import Button from '../ui/Button';
import Form from '../ui/Form';
import Heading from '../ui/Heading';
import { Input, TextArea } from '../ui/Input';
import Select from '../ui/Select';
import styles from './TilsynForm.module.css';

type TilsynFormProps = {
    isOpen: boolean;
    setSelectedPoint: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
};

const TilsynForm = ({ isOpen, setSelectedPoint }: TilsynFormProps) => {
    const { setTilsynFormData, tilsynFormData: formData, tilsynFormProperties, setTilsynFormProperties } = use(TilsynFormContext);
    const { disabled } = tilsynFormProperties;
    const { projects, users } = usePage<{ projects: { name: string; number: number }[]; users: User[] }>().props;
    const title = disabled ? 'Rediger tilsynsobjekt' : 'Legg til nytt tilsynsobjekt';

    // Update state while typing in input fields
    function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) {
        const key = e.target.id;
        const value = e.target.value;
        setTilsynFormData((values) => {
            if (!values) return values;
            return {
                ...values,
                [key]: value,
            } as TilsynObject;
        });
    }

    function handleSubmitTilsynForm(e: React.FormEvent) {
        e.preventDefault();
        // router.post('/login')
    }

    function handleCancelTilsynForm() {
        setTilsynFormProperties({ open: false, disabled: true });
        setSelectedPoint(null); // Reset selected point on the map
    }

    return (
        <SidebarSection isOpen={isOpen} title={title}>
            {tilsynFormProperties.open === false && (
                <div className={styles.emptyState}>
                    Velg et tilsynsobjekt på kartet for å redigere, eller høyreklikk på en eiendom for å opprette et nytt tilsynsobjekt.
                </div>
            )}
            {tilsynFormProperties.open === true && (
                <Form onSubmit={handleSubmitTilsynForm}>
                    <div>
                        <Heading
                            className={styles.heading}
                            level={2}
                        >{`${formData.gnr}/${formData.bnr}${formData.fnr ? `/${formData.fnr}` : ''} ${formData.adresse}`}</Heading>
                        <p className={styles.subtitle}>Sone {formData.sone}</p>
                    </div>
                    <fieldset className={styles.formGrid} disabled={disabled}>
                        <label htmlFor="prosjekt">Prosjekt</label>
                        <Select id="prosjekt" value={formData.project_id || ''} onChange={handleChange}>
                            {projects.map((project) => (
                                <option key={project.number} value={project.number}>
                                    {`${project.number} - ${project.name}`}
                                </option>
                            ))}
                        </Select>

                        <label htmlFor="status">Status</label>
                        <Select id="status" value={formData.status || ''} onChange={handleChange}>
                            {TILSYN_STATUS.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.text}
                                </option>
                            ))}
                        </Select>

                        <label htmlFor="bygning">Bygning</label>
                        <Select id="bygning" value={formData.bygning} onChange={handleChange}>
                            <option value="B">Bolig</option>
                            <option value="H">Fritidsbolig</option>
                            <option value="N">Næringsbygg</option>
                            <option value="I">Ingen bygning</option>
                        </Select>

                        <label htmlFor="saksbehandler">Saksbehandler</label>
                        <Select id="saksbehandler" value={formData.saksbehandler || ''} onChange={handleChange}>
                            {users.map((user) => (
                                <option key={user.id} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </Select>

                        <label htmlFor="hjemmel">Hjemmel</label>
                        <Input id="hjemmel" value={formData.hjemmel || ''} onChange={handleChange} />

                        <label htmlFor="saksnr.">Saksnr.</label>
                        <Input id="saksnr." value={formData.saksnr || ''} onChange={handleChange} />

                        <label htmlFor="frist">Frist</label>
                        <Input type="date" id="frist" value={formData.frist || ''} onChange={handleChange} />

                        <label htmlFor="kommentar">Kommentar</label>
                        <TextArea className={styles.grid2columns} id="kommentar" value={formData.kommentar || ''} onChange={handleChange} />

                        <label htmlFor="svarskjema">Svarskjema</label>
                        <TextArea className={styles.grid2columns} id="svarskjema" value={formData.svarskjema || ''} onChange={handleChange} />

                        <label htmlFor="komtek">KomTek</label>
                        <TextArea className={styles.grid2columns} id="komtek" value={formData.komtek || ''} onChange={handleChange} />

                        <label htmlFor="kontroll" className={styles.grid2columns}>
                            Slamtømming kontroll
                        </label>
                        <TextArea className={styles.grid2columns} id="kontroll" value={formData.kontroll || ''} onChange={handleChange} />

                        <label htmlFor="arkiv">Arkiv</label>
                        <TextArea className={styles.grid2columns} id="arkiv" value={formData.arkiv || ''} onChange={handleChange} />
                    </fieldset>
                    {disabled && (
                        <div className={styles.cta}>
                            <Button>Rediger tilsynsobjekt</Button>
                            <Button variant="secondary">Slett</Button>
                        </div>
                    )}
                    {!disabled && (
                        <div className={styles.cta}>
                            <Button type="submit">Legg til nytt tilsynsobjekt</Button>
                            <Button variant="secondary" onClick={handleCancelTilsynForm}>
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
