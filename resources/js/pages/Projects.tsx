import ProjectCard from '@/components/Projects/ProjectCard';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import styles from './Projects.module.css';

const Projects = () => {
    return (
        <AppLayout>
            <Head title="Prosjekter" />
            <ul className={styles.projectsList}>
                <ProjectCard id={5} title="Begna" noObjects={79} noDone={0} />
                <ProjectCard id={4} title="Sentrum/Hadelandsveien" noObjects={16} noDone={0} />
                <ProjectCard id={3} title="Tyristrand" noObjects={28} noDone={4} />
                <ProjectCard id={2} title="Sogna" noObjects={111} noDone={56} />
                <ProjectCard id={1} title="Steinsfjorden" noObjects={299} noDone={82} />
                <ProjectCard id={101} title="Tilknytning" noObjects={60} noDone={30} />
            </ul>
        </AppLayout>
    );
};

export default Projects;
