import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import Select from '../ui/Select';
import { useEffect, useRef } from 'react';
import L from 'leaflet';

const FilterByProject = ({
    selectedProject,
    setSelectedProject,
    className,
}: {
    selectedProject: string;
    setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
}) => {
    const { projects } = usePage<SharedData>().props;
    const projectRef = useRef<HTMLSelectElement | null>(null);

    // Disable click propagation on the project select to prevent map interactions when clicking on the select
    useEffect(() => {
        if (projectRef.current) {
            L.DomEvent.disableClickPropagation(projectRef.current);
        }
    }, []);

    return (
        <Select
            name="filter"
            onChange={(e) => setSelectedProject(e.target.value)}
            value={selectedProject}
            className={className}
            ref={projectRef}
        >
            <option value="">Alle prosjekter</option>
            {projects.map((project) => (
                <option key={project.id} value={project.id}>
                    {`${project.id} - ${project.name}`}
                </option>
            ))}
            <option value="ingen">Uten prosjekt</option>
        </Select>
    );
};

export default FilterByProject;
