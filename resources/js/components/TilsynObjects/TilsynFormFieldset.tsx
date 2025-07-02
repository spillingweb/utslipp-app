import { TILSYN_STATUS } from '@/lib/tilsynStatus';
import { TilsynObject, User } from '@/types';
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
    setData: (field: keyof TilsynObject, value: unknown) => void;
}) => {
    const { projects, users } = usePage<{ projects: { name: string; number: number; id: number }[]; users: User[] }>().props;

    return (
        <fieldset className={styles.formGrid} disabled={disabled}>
            <label htmlFor="sone">Sone</label>
            <Input id="sone" type="string" value={data.sone || ''} readOnly />
            <label htmlFor="project_id">Prosjekt</label>
            <Select id="project_id" value={data.project_id || ''} onChange={(e) => setData('project_id', e.target.value)}>
                <option value="">Ingen prosjekt</option>
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>
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

            <label htmlFor="saksbeh">Saksbeh.</label>
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

            <label htmlFor="arkiv">Arkiv</label>
            <TextArea className={styles.grid2columns} id="arkiv" value={data.arkiv || ''} onChange={(e) => setData('arkiv', e.target.value)} />
        </fieldset>
    );
};

export default TilsynFormFieldset;
