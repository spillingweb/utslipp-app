import ProjectCard from '@/components/Projects/ProjectCard';
import AppLayout from '@/layouts/AppLayout';
import { TilsynObject } from '@/types';
import { Head } from '@inertiajs/react';
import styles from './Projects.module.css';

type Project = {
    id: number;
    name: string;
    number: number;
    tilsyn_objects: TilsynObject[];
};

const Projects = ({ projects }: { projects: Project[] }) => {
    return (
        <AppLayout>
            <Head title="Prosjekter" />
            <ul className={styles.projectsList}>
                {projects.map((project) => (
                    <ProjectCard key={project.id} id={project.id} title={project.name} objects={project.tilsyn_objects} />
                ))}
            </ul>
        </AppLayout>
    );
};

export default Projects;
