import { TILSYN_STATUS } from '@/lib/tilsynStatus';
import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { TilsynObject } from '@/types';
import { use } from 'react';
import Button from '../ui/Button';
import Form from '../ui/Form';
import Heading from '../ui/Heading';
import { Input, TextArea } from '../ui/Input';
import Select from '../ui/Select';
import styles from './TilsynForm.module.css';

const TilsynForm = () => {
    const { setTilsynFormData, tilsynFormData: formData, tilsynFormProperties } = use(TilsynFormContext);

    const { disabled } = tilsynFormProperties;

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

    return (
        <Form onSubmit={handleSubmitTilsynForm}>
            <Heading
                className={styles.heading}
                level={2}
            >{`${formData.gnr}/${formData.bnr}${formData.fnr ? `/${formData.fnr}` : ''} ${formData.adresse}`}</Heading>
            <fieldset className={styles.formGrid} disabled={disabled}>
                <label>Sone</label>
                <p className={styles.formParagraph}>{formData.sone}</p>

                <label htmlFor="prosjekt">Prosjekt</label>
                <Select
                    optionsArray={[
                        { value: '1', text: 'Prosjekt 1' },
                        { value: '2', text: 'Prosjekt 2' },
                        { value: '3', text: 'Prosjekt 3' },
                        { value: '4', text: 'Prosjekt 4' },
                    ]}
                    id="prosjekt"
                    value={formData.prosjekt || ''}
                    onChange={handleChange}
                />

                <label htmlFor="status">Status</label>
                <Select optionsArray={TILSYN_STATUS} id="status" value={formData.status || ''} onChange={handleChange} />

                <label htmlFor="bygning">Bygning</label>
                <Select
                    optionsArray={[
                        { value: 'B', text: 'Bolig' },
                        { value: 'H', text: 'Fritidsbolig' },
                        { value: 'N', text: 'Næringsbygg' },
                        { value: 'I', text: 'Ingen bygning' },
                    ]}
                    id="bygning"
                    value={formData.bygning}
                    onChange={handleChange}
                />

                <label htmlFor="hjemmel">Hjemmel</label>
                <Input id="hjemmel" value={formData.hjemmel || ''} onChange={handleChange} />

                <label htmlFor="saksnr.">Saksnr.</label>
                <Input id="saksnr." value={formData.saksnr || ''} onChange={handleChange} />

                <label htmlFor="saksbehandler">Saksbehandler</label>
                <Input id="saksbehandler" value={formData.saksbehandler || ''} onChange={handleChange} />

                <label htmlFor="frist">Frist</label>
                <Input type="date" id="frist" value={formData.frist || ''} onChange={handleChange} />

                <label className={styles.grid2columns} htmlFor="kommentar">
                    Kommentar
                </label>
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
                    <Button>Legg til nytt tilsynsobjekt</Button>
                    <Button variant="secondary">Avbryt</Button>
                </div>
            )}
        </Form>
    );
};

export default TilsynForm;
