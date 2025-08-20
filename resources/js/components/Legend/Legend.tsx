import { TILSYN_STATUS } from '../../lib/tilsynStatus';
import { SidebarTab } from '../Sidebar/Sidebar';
import SidebarSection from '../Sidebar/SidebarSection';
import styles from './Legend.module.css';

const Legend = ({ isOpen, setSidebarTabOpen }: { isOpen: boolean, setSidebarTabOpen: React.Dispatch<React.SetStateAction<SidebarTab | null>> }) => {
    return (
        <SidebarSection title="Tegnforklaring" isOpen={isOpen} setSidebarTabOpen={setSidebarTabOpen}>
            <ul className={styles.legend}>
                {TILSYN_STATUS.map((status) => (
                    <li key={status.value}>
                        <svg height="24" width="24">
                            <circle
                                cx="12"
                                cy="12"
                                r={status.small ? '1' : '10'}
                                style={{
                                    strokeWidth: 4,
                                    stroke: status.stroke ? status.stroke : status.color,
                                    fill: status.color,
                                    fillOpacity: 0.5,
                                }}
                            ></circle>
                        </svg>
                        {status.text}
                    </li>
                ))}
            </ul>
        </SidebarSection>
    );
};

export default Legend;
