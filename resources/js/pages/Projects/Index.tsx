import ProjectCard from '@/components/Projects/ProjectCard';
import Flash from '@/components/ui/Flash';
import AppLayout from '@/layouts/AppLayout';
import { TilsynObject } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import CreateProject from './CreateProject';
import styles from './Index.module.css';

type Project = {
    id: number;
    name: string;
    number: number;
    tilsyn_objects: TilsynObject[];
};

const Index = ({ projects, noProjects }: { projects: Project[]; noProjects: TilsynObject[] }) => {
    const { flash } = usePage<{ flash: { success: string | null; error: string | null } }>().props;
    return (
        <AppLayout>
            <Head title="Prosjekter" />
            <Flash message={flash} />
            <ul className={styles.projectsList}>
                <CreateProject />
                {projects.map((project) => (
                    <ProjectCard key={project.id} id={project.id} name={project.name} number={project.number} objects={project.tilsyn_objects} />
                ))}
                <ProjectCard name="Uten Prosjekt" objects={noProjects} />
            </ul>
        </AppLayout>
    );
};

export default Index;
