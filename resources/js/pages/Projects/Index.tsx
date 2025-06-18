import ProjectCard from '@/components/Projects/ProjectCard';
import AppLayout from '@/layouts/AppLayout';
import { TilsynObject } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Create from './Create';
import styles from './Index.module.css';

type Project = {
    id: number;
    name: string;
    number: number;
    tilsyn_objects: TilsynObject[];
};

const Index = ({ projects }: { projects: Project[] }) => {
    const { flash } = usePage<{ flash: { message: string | null } }>().props;

    return (
        <AppLayout>
            <Head title="Prosjekter" />
            {flash.message && <div className='flash success'>{flash.message}</div>}
            <ul className={styles.projectsList}>
                <Create />
                {projects.map((project) => (
                    <ProjectCard key={project.id} id={project.id} title={project.name} objects={project.tilsyn_objects} />
                ))}
            </ul>
        </AppLayout>
    );
};

export default Index;
