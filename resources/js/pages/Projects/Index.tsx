import ProjectCard from '@/components/Projects/ProjectCard';
import AppLayout from '@/layouts/AppLayout';
import { SharedData, TilsynObject } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import CreateProject from './CreateProject';
import styles from './Index.module.css';

type Project = {
    id: number;
    name: string;
    tilsyn_objects: TilsynObject[];
};

const Index = ({ projects, noProjects }: { projects: Project[]; noProjects: TilsynObject[] }) => {
    const { can } = usePage<SharedData>().props;

    return (
        <AppLayout>
            <Head title="Prosjekter" />
            <ul className={styles.projectsList}>
                {can.project_edit && <CreateProject />}
                {projects.map((project) => (
                    <ProjectCard key={project.id} id={project.id} name={project.name} objects={project.tilsyn_objects} />
                ))}
                <ProjectCard name="Uten Prosjekt" objects={noProjects} />
            </ul>
        </AppLayout>
    );
};

export default Index;
