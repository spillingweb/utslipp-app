import { TILSYN_STATUS } from '@/lib/tilsynStatus';
import { SharedData, TilsynObject } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Trash2, PencilLine } from 'lucide-react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import Heading from '../ui/Heading';
import styles from './ProjectCard.module.css';

type ProjectCardProps = {
    id?: number;
    name: string;
    objects: TilsynObject[];
};

const ProjectCard = ({ id, name, objects }: ProjectCardProps) => {
    const { can } = usePage<SharedData>().props;

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

    const handleEditProject = () => {
        router.get(route('project.edit', id));
    };

    // Title shows id and name, or "Uten Prosjekt" if no id (for unassigned objects)
    const title = id ? `${id} - ${name}` : 'Uten Prosjekt';

    return (
        <li className={styles.projectCard}>
            <div className={styles.projectHeader}>
                <Heading level={3}>{title}</Heading>
                {can.project_edit && id && (
                    <div>
                        <button className={styles.editButton} title="Rediger prosjekt">
                            <PencilLine size={14} onClick={handleEditProject} />
                        </button>
                        <button className={styles.deleteButton} title="Slett prosjekt">
                            <Trash2 size={14} onClick={handleDeleteProject} />
                        </button>
                    </div>
                )}
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
                <Link href={`tilsynsobjekter?prosjekt=${id ? id : 'ingen'}`}>Se tabell</Link>
                <Link href={`/?prosjekt=${id ? id : 'ingen'}`}>Vis i kart</Link>
            </div>
        </li>
    );
};

export default ProjectCard;
