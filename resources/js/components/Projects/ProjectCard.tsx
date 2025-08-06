import { TILSYN_STATUS } from '@/lib/tilsynStatus';
import { TilsynObject } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import Heading from '../ui/Heading';
import styles from './ProjectCard.module.css';

type ProjectCardProps = {
    id?: number;
    name: string;
    objects: TilsynObject[];
};

const ProjectCard = ({ id, name, objects }: ProjectCardProps) => {
    const noObjects = objects.length;
    const noFinished = objects.filter((obj) => obj.status === 'F').length;
    const finishedPercentage = noObjects ? Math.round((noFinished / noObjects) * 100) : 0;

    const objectsData = TILSYN_STATUS.map((status) => ({
        status: status.value,
        name: status.text,
        color: status.color,
        value: objects.filter((obj) => obj.status === status.value).length,
    }));

    const handleDeleteProject = () => {
        if (confirm(`Er du sikker på at du vil slette prosjekt ${id} - ${name}? Det kan ikke angres.`)) {
            router.delete(route('project.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const title = id ? `${id} - ${name}` : 'Uten Prosjekt';

    return (
        <li className={styles.projectCard}>
            <div className={styles.projectHeader}>
                <Heading level={3}>{title}</Heading>
                {id &&<button className={styles.deleteButton} title="Slett prosjekt">
                    <Trash2 size={24} onClick={handleDeleteProject} />
                </button>}
            </div>
            <div className={styles.projectData}>
                <p>{`Antall tilsynsobjekter: ${noObjects}`}</p>
                <p>{`Antall ferdigstilte: ${noFinished} (${finishedPercentage} %)`}</p>
                <figure className={styles.pieChart}>
                    <PieChart width={200} height={200} className={styles.pieChart}>
                        <Pie data={objectsData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                            {objectsData.map((object) => (
                                <Cell key={object.status} fill={object.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </figure>
                <Link href={`tilsynsobjekter?project_id=${id ? id : 'null'}`}>Se tabell</Link>
                <a href="#">Vis i kart</a>
            </div>
        </li>
    );
};

export default ProjectCard;
