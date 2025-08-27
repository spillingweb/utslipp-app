import { usePage } from '@inertiajs/react';
import Select from '../ui/Select';
import { SharedData } from '@/types';

const FilterByProject = ({
    selectedProject,
    setSelectedProject,
    className,
    ref
}: {
    selectedProject: string;
    setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
    ref?: React.Ref<HTMLSelectElement>;
}) => {
    const { projects } = usePage<SharedData>().props;

    return (
        <Select name="filter" onChange={(e) => setSelectedProject(e.target.value)} value={selectedProject} className={className} ref={ref}>
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
