import { TILSYN_STATUS } from '@/lib/tilsynStatus';
import { TilsynObject } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import Form from '../ui/Form';
import Heading from '../ui/Heading';
import Input from '../ui/Input';
import Select from '../ui/Select';
import styles from './TilsynForm.module.css';

const TilsynForm = ({ formData }: { formData: TilsynObject }) => {
    const [formDisabled, setFormDisabled] = useState(formData.id !== undefined);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: formData.id || undefined,
        gnr: formData.gnr || '',
        bnr: formData.bnr || '',
        fnr: formData.fnr || '',
        adresse: formData.adresse || '',
        sone: formData.sone || '',
        prosjekt: formData.prosjekt || '',
        status: formData.status || '',
        bygning: formData.bygning || '',
        hjemmel: formData.hjemmel || '',
        saksnr: formData.saksnr || '',
        saksbehandler: formData.saksbehandler || '',
        frist: formData.frist || '',
        kommentar: formData.kommentar || '',
        svarskjema: formData.svarskjema || '',
        komtek: formData.komtek || '',
        kontroll: formData.kontroll || '',
        arkiv: formData.arkiv || '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // post('/login')
    }

    console.log('TilsynForm', formData);

    return (
        <Form onSubmit={handleSubmit}>
            <Heading
                className={styles.heading}
                level={2}
            >{`${formData.gnr}/${formData.bnr}${formData.fnr ? `/${formData.fnr}` : ''} ${formData.adresse}`}</Heading>
            <fieldset className={styles.formGrid} disabled={formDisabled}>
                <label htmlFor="zone">Sone</label>
                <Input id="zone" value={formData.sone} disabled />

                <label htmlFor="project">Prosjekt</label>
                <Select
                    optionsArray={[
                        { value: '1', text: 'Prosjekt 1' },
                        { value: '2', text: 'Prosjekt 2' },
                        { value: '3', text: 'Prosjekt 3' },
                        { value: '4', text: 'Prosjekt 4' },
                    ]}
                    id="project"
                    value={data.prosjekt}
                    onChange={(e) => setData('prosjekt', e.target.value)}
                />

                <label htmlFor="status">Status</label>
                <Select optionsArray={TILSYN_STATUS} id="status" value={data.status} onChange={(e) => setData('status', e.target.value)} />

                <label htmlFor="building">Bygning</label>
                <Select
                    optionsArray={[
                        { value: 'B', text: 'Bolig' },
                        { value: 'H', text: 'Fritidsbolig' },
                        { value: 'N', text: 'Næringsbygg' },
                        { value: 'I', text: 'Ingen bygning' },
                    ]}
                    id="building"
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                />

                <label htmlFor="hjemmel">Hjemmel</label>
                <Input id="hjemmel" value={data.hjemmel} onChange={(e) => setData('hjemmel', e.target.value)} />

                <label htmlFor="saksnr.">Saksnr.</label>
                <Input id="saksnr." value={data.saksnr} onChange={(e) => setData('saksnr', e.target.value)} />

                <label htmlFor="saksbehandler">Saksbehandler</label>
                <Input id="saksbehandler" value={data.saksbehandler} onChange={(e) => setData('saksbehandler', e.target.value)} />

                <label htmlFor="frist">Frist</label>
                <Input type="date" id="frist" value={data.frist} onChange={(e) => setData('frist', e.target.value)} />

                <label className={styles.grid2columns} htmlFor="kommentar">
                    Kommentar
                </label>
                <textarea
                    className={styles.grid2columns}
                    id="kommentar"
                    disabled={formDisabled}
                    value={data.kommentar}
                    onChange={(e) => setData('kommentar', e.target.value)}
                />

                <label htmlFor="svarskjema">Svarskjema</label>
                <textarea
                    className={styles.grid2columns}
                    id="svarskjema"
                    disabled={formDisabled}
                    value={data.svarskjema}
                    onChange={(e) => setData('svarskjema', e.target.value)}
                />

                <label htmlFor="komtek">KomTek</label>
                <textarea
                    className={styles.grid2columns}
                    id="komtek"
                    disabled={formDisabled}
                    value={data.komtek}
                    onChange={(e) => setData('komtek', e.target.value)}
                />

                <label htmlFor="kontroll">Slamtømming kontroll</label>
                <textarea
                    className={styles.grid2columns}
                    id="kontroll"
                    disabled={formDisabled}
                    value={data.kontroll}
                    onChange={(e) => setData('kontroll', e.target.value)}
                />

                <label htmlFor="arkiv">Arkiv</label>
                <textarea
                    className={styles.grid2columns}
                    id="arkiv"
                    disabled={formDisabled}
                    value={data.arkiv}
                    onChange={(e) => setData('arkiv', e.target.value)}
                />
            </fieldset>
        </Form>
    );
};

export default TilsynForm;
