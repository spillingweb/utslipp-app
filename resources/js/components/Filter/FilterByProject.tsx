import { usePage } from '@inertiajs/react';
import Select from '../ui/Select';

const FilterByProject = ({
    selectedProject,
    setSelectedProject,
}: {
    selectedProject: string;
    setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const { projects } = usePage<{ projects: { id: number; name: string; number: string }[] }>().props;

    return (
        <Select name="filter" onChange={(e) => setSelectedProject(e.target.value)} value={selectedProject}>
            <option value="">Alle prosjekter</option>
            {projects.map((project) => (
                <option key={project.id} value={project.id}>
                    {`${project.number} - ${project.name}`}
                </option>
            ))}
            <option value="null">Uten prosjekt</option>
        </Select>
    );
};

export default FilterByProject;
