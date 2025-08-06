import ProjectCard from '@/components/Projects/ProjectCard';
import AppLayout from '@/layouts/AppLayout';
import { TilsynObject } from '@/types';
import { Head } from '@inertiajs/react';
import CreateProject from './CreateProject';
import styles from './Index.module.css';

type Project = {
    id: number;
    name: string;
    tilsyn_objects: TilsynObject[];
};

const Index = ({ projects, noProjects }: { projects: Project[]; noProjects: TilsynObject[] }) => {
    return (
        <AppLayout>
            <Head title="Prosjekter" />
            <ul className={styles.projectsList}>
                <CreateProject />
                {projects.map((project) => (
                    <ProjectCard key={project.id} id={project.id} name={project.name} objects={project.tilsyn_objects} />
                ))}
                <ProjectCard name="Uten Prosjekt" objects={noProjects} />
            </ul>
        </AppLayout>
    );
};

export default Index;
