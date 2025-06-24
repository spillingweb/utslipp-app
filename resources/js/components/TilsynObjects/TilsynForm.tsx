import { TILSYN_STATUS } from '@/lib/tilsynStatus';
import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { LatLngLiteral } from 'leaflet';
import { use, useState } from 'react';
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
    selectedPoint: LatLngLiteral | null;
};

const TilsynForm = ({ isOpen, setSelectedPoint, selectedPoint }: TilsynFormProps) => { 
    // Access the TilsynFormContext to get form data and properties
    const { setData, data, tilsynFormProperties, setTilsynFormProperties, storeTilsynObject, updateTilsynObject, processing, cancel } = use(TilsynFormContext);
    const { disabled, open } = tilsynFormProperties;
   
    const { projects, users } = usePage<{ projects: { name: string; number: number }[]; users: User[] }>().props;

    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

    const handleStartEdit = () => {
        setFormMode('edit');
        setTilsynFormProperties({ open: true, disabled: false });
    };
    
    const handleCancelTilsynForm = () => {
        setTilsynFormProperties({ open: false, disabled: true });
        setSelectedPoint(null); // Reset selected point on the map
        cancel(); // Reset form data
    };

    const handleDeleteTilsynObject = () => {
        if (confirm(`Er du sikker på at du vil slette tilsynsobjektet med id ${data.id}? Det kan ikke angres.`)) {
            router.delete(route('map.destroy', data.id), {
                onSuccess: () => {
                    setTilsynFormProperties({ open: false, disabled: true });
                    setSelectedPoint(null); // Reset selected point on the map
                },
            });
        }
    }

    const handleSubmitForm = (e: React.FormEvent, dbFunction: () => void) => {
        e.preventDefault();
        dbFunction();
        setSelectedPoint(null); // Reset selected point on the map
    };

    return (
        <SidebarSection isOpen={isOpen} title="Tilsynsobjekt">
            {open === false && (
                <div className={styles.emptyState}>
                    Velg et tilsynsobjekt på kartet for å vise/redigere, eller høyreklikk på en eiendom for å opprette et nytt tilsynsobjekt.
                </div>
            )}
            {open === true && (
                <Form>
                    <div>
                        <Heading
                            className={styles.heading}
                            level={2}
                        >{`${data.gnr}/${data.bnr}${data.fnr ? `/${data.fnr}` : ''} ${data.adresse}`}</Heading>
                        <p className={styles.subtitle}>Sone {data.sone}</p>
                    </div>
                    <fieldset className={styles.formGrid} disabled={disabled}>
                        {selectedPoint && (
                            <>
                                <label htmlFor="lat">Latitude</label>
                                <Input id="lat" type="number" value={selectedPoint.lat || ''} readOnly disabled/>

                                <label htmlFor="lng">Longitude</label>
                                <Input id="lng" type="number" value={selectedPoint.lng || ''} readOnly disabled/>
                            </>
                        )}
                        <label htmlFor="project_id">Prosjekt</label>
                        <Select id="project_id" value={data.project_id} onChange={(e) => setData('project_id', e.target.value)}>
                            <option value="">Ingen prosjekt</option>
                            {projects.map((project) => (
                                <option key={project.number} value={project.number}>
                                    {`${project.number} - ${project.name}`}
                                </option>
                            ))}
                        </Select>

                        <label htmlFor="status">Status</label>
                        <Select id="status" value={data.status || ''} onChange={(e) => setData('status', e.target.value)}>
                            {TILSYN_STATUS.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.text}
                                </option>
                            ))}
                        </Select>

                        <label htmlFor="bygning">Bygning</label>
                        <Select id="bygning" value={data.bygning} onChange={(e) => setData('bygning', e.target.value)}>
                            <option value="">Velg bygning</option>
                            <option value="B">Bolig</option>
                            <option value="H">Fritidsbolig</option>
                            <option value="N">Næringsbygg</option>
                            <option value="I">Ingen bygning</option>
                        </Select>

                        <label htmlFor="saksbeh">Saksbehandler</label>
                        <Select id="saksbeh" value={data.saksbeh || ''} onChange={(e) => setData('saksbeh', e.target.value)}>
                            {users.map((user) => (
                                <option key={user.id} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </Select>

                        <label htmlFor="hjemmel">Hjemmel</label>
                        <Input id="hjemmel" value={data.hjemmel || ''} onChange={(e) => setData('hjemmel', e.target.value)} />

                        <label htmlFor="saksnr">Saksnr.</label>
                        <Input id="saksnr" value={data.saksnr || ''} onChange={(e) => setData('saksnr', e.target.value)} />

                        <label htmlFor="frist">Frist</label>
                        <Input type="date" id="frist" value={data.frist || ''} onChange={(e) => setData('frist', e.target.value)} />

                        <label htmlFor="kommentar">Kommentar</label>
                        <TextArea className={styles.grid2columns} id="kommentar" value={data.kommentar || ''} onChange={(e) => setData('kommentar', e.target.value)} />

                        <label htmlFor="svarskjema">Svarskjema</label>
                        <TextArea className={styles.grid2columns} id="svarskjema" value={data.svarskjema || ''} onChange={(e) => setData('svarskjema', e.target.value)} />

                        <label htmlFor="komtek">KomTek</label>
                        <TextArea className={styles.grid2columns} id="komtek" value={data.komtek || ''} onChange={(e) => setData('komtek', e.target.value)} />

                        <label htmlFor="kontroll" className={styles.grid2columns}>
                            Slamtømming kontroll
                        </label>
                        <TextArea className={styles.grid2columns} id="kontroll" value={data.kontroll || ''} onChange={(e) => setData('kontroll', e.target.value)} />

                        <label htmlFor="arkiv">Arkiv</label>
                        <TextArea className={styles.grid2columns} id="arkiv" value={data.arkiv || ''} onChange={(e) => setData('arkiv', e.target.value)} />
                    </fieldset>
                    {disabled && (
                        <div className={styles.cta}>
                            <Button onClick={handleStartEdit}>Rediger tilsynsobjekt</Button>
                            <Button onClick={handleDeleteTilsynObject} variant="secondary">
                                Slett
                            </Button>
                        </div>
                    )}
                    {!disabled && formMode == 'create' && (
                        <div className={styles.cta}>
                            <Button type='submit' onClick={(e) => handleSubmitForm(e, storeTilsynObject)} disabled={processing}>
                                Legg til nytt tilsynsobjekt
                            </Button>
                            <Button variant="secondary" onClick={handleCancelTilsynForm}>
                                Avbryt
                            </Button>
                        </div>
                    )}
                    {!disabled && formMode == 'edit' && (
                        <div className={styles.cta}>
                            <Button type='submit' onClick={(e) => handleSubmitForm(e, updateTilsynObject)} disabled={processing}>
                                Lagre endringer
                            </Button>
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
