import { TILSYN_STATUS } from '@/lib/tilsynStatus';
import { SharedData, TilsynObject } from '@/types';
import { usePage } from '@inertiajs/react';
import { Input, TextArea } from '../ui/Input';
import Select from '../ui/Select';
import styles from './TilsynFormFieldset.module.css';

const TilsynFormFieldset = ({
    disabled,
    data,
    setData,
}: {
    disabled: boolean;
    data: TilsynObject;
    setData: (field: keyof TilsynObject, value: string | number | undefined) => void;
}) => {
    const { projects, users } = usePage<SharedData>().props;

    let sone = data.sone.toString();

    switch (sone) {
        case '1':
            sone += ' - Steinsfjorden';
            break;
        case '2':
            sone += ' - Sogna';
            break;
        case '3':
            sone += ' - Tyrifjorden';
            break;
        case '4':
            sone += ' - Randselva/Storelva';
            break;
        case '5':
            sone += ' - Begna';
            break;
        case '6':
            sone += ' - Lysakervassdraget';
            break;
        case '7':
            sone += ' - Sandviksvassdraget';
            break;
        default:
            sone = '';
    }

    return (
        <fieldset className={styles.formGrid} disabled={disabled}>
            <label htmlFor="sone">Sone</label>
            <Input id="sone" type="string" value={sone || ''} readOnly />
            <label htmlFor="project_id">Prosjekt</label>
            <Select id="project_id" value={data.project_id || ''} onChange={(e) => setData('project_id', e.target.value)}>
                <option value="">Ingen prosjekt</option>
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                        {`${project.id} - ${project.name}`}
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
            <Select id="bygning" value={data.bygning || ''} onChange={(e) => setData('bygning', e.target.value)}>
                <option value="">Velg bygning</option>
                <option value="B">Bolig</option>
                <option value="H">Fritidsbolig</option>
                <option value="N">Næringsbygg</option>
                <option value="I">Ingen bygning</option>
            </Select>

            <label htmlFor="saksbeh">Saksbeh.</label>
            <Select id="saksbeh" value={data.saksbeh || ''} onChange={(e) => setData('saksbeh', e.target.value)}>
                <option value="">{data.saksbeh || 'Velg saksbehandler'}</option>
                {users.data.map((user) => (
                    <option key={user.id} value={user.name}>
                        {user.name}
                    </option>
                ))}
            </Select>

            <label htmlFor="hjemmel">Hjemmel</label>
            <Select id="hjemmel" value={data.hjemmel || ''} onChange={(e) => setData('hjemmel', e.target.value)}>
                <option value="">Velg hjemmel</option>
                <option value="27-2">§ 27-2 i plan- og bygningsloven (tilknytningsplikt)</option>
                <option value="7">§ 7 i forurensningsloven (ulovlig forurensning)</option>
                <option value="18">§ 18 i forurensningsloven (trekke tilbake tillatelse)</option>
                <option value="12-16">§ 12-16 i forurensningsforskriften (ulovliggjøre utslipp)</option>
                <option value="other">Annen hjemmel</option>
            </Select>

            <label htmlFor="saksnr">Saksnr.</label>
            <Input id="saksnr" value={data.saksnr || ''} onChange={(e) => setData('saksnr', e.target.value)} />

            <label htmlFor="frist">Frist</label>
            <Input type="date" id="frist" value={data.frist || ''} onChange={(e) => setData('frist', e.target.value)} />

            <label htmlFor="kommentar">Kommentar</label>
            <TextArea
                className={styles.grid2columns}
                id="kommentar"
                value={data.kommentar || ''}
                onChange={(e) => setData('kommentar', e.target.value)}
            />

            <label htmlFor="svarskjema">Svarskjema</label>
            <TextArea
                className={styles.grid2columns}
                id="svarskjema"
                value={data.svarskjema || ''}
                onChange={(e) => setData('svarskjema', e.target.value)}
            />

            <label htmlFor="komtek">KomTek</label>
            <TextArea className={styles.grid2columns} id="komtek" value={data.komtek || ''} onChange={(e) => setData('komtek', e.target.value)} />

            <label htmlFor="kontroll" className={styles.grid2columns}>
                Slamtømming kontroll
            </label>
            <TextArea
                className={styles.grid2columns}
                id="kontroll"
                value={data.kontroll || ''}
                onChange={(e) => setData('kontroll', e.target.value)}
            />

            <div className={`${styles.grid2columns} ${styles.flexSpaceBetween}`}>
                <label htmlFor="arkiv">Arkiv</label>
                <a className={styles.link}
                    href={`https://ringerike.documaster.no/browse/?gnr=${data.gnr}&bnr=${data.bnr}${data.fnr ? `&fnr=${data.fnr}` : ''}`}
                    tabIndex={0}
                    target="_blank"
                >
                    Åpne Documaster
                </a>
            </div>

            <TextArea className={styles.grid2columns} id="arkiv" value={data.arkiv || ''} onChange={(e) => setData('arkiv', e.target.value)} />
        </fieldset>
    );
};

export default TilsynFormFieldset;
