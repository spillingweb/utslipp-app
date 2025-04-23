import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import Heading from '../ui/Heading';
import styles from './ProjectCard.module.css';

type ProjectCardProps = {
    id: number;
    title: string;
    noObjects: number;
    noDone: number;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ProjectCard = ({ id, title, noObjects, noDone }: ProjectCardProps) => {
    const projectData = [
        { name: 'Ferdig', value: noDone },
        { name: 'Tilsyn påbegynt', value: noObjects - noDone },
    ];

    return (
        <li className={styles.projectCard}>
            <div className={styles.projectHeader}>
                <Heading level={3}>{`${id} - ${title}`}</Heading>
            </div>
            <div className={styles.projectData}>
                <p>{`Antall tilsynsobjekter: ${noObjects}`}</p>
                <figure className={styles.pieChart}>
                    <PieChart width={200} height={200}>
                        <Pie data={projectData} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={50}>
                            {projectData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
