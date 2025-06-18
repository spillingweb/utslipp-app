import { TILSYN_STATUS } from '@/lib/tilsynStatus';
import { TilsynObject } from '@/types';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import Heading from '../ui/Heading';
import styles from './ProjectCard.module.css';

type ProjectCardProps = {
    id: number;
    title: string;
    objects: TilsynObject[];
};

const ProjectCard = ({ id, title, objects }: ProjectCardProps) => {
    const noObjects = objects.length;
    const noFinished = objects.filter((obj) => obj.status === 'F').length;
    const finishedPercentage = noObjects ? noFinished / noObjects * 100 : 0;

    const objectsData = TILSYN_STATUS.map((status) => ({
        status: status.value,
        name: status.text,
        color: status.color,
        value: objects.filter((obj) => obj.status === status.value).length,
    }));

    return (
        <li className={styles.projectCard}>
            <div className={styles.projectHeader}>
                <Heading level={3}>{`${id} - ${title}`}</Heading>
            </div>
            <div className={styles.projectData}>
                <p>{`Antall tilsynsobjekter: ${noObjects}`}</p>
                <p>{`Antall ferdigstilte: ${noFinished} (${finishedPercentage}%)`}</p>
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
                <a href={`#table${id}`}>Se tabell</a>
                <a href={`#map${id}`}>Vis i kart</a>
            </div>
        </li>
    );
};

export default ProjectCard;
