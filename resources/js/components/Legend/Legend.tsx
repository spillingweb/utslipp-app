import { SidebarContext } from '@/store/sidebar-context';
import { use } from 'react';
import { TILSYN_STATUS } from '../../lib/tilsynStatus';
import SidebarSection from '../Sidebar/SidebarSection';
import styles from './Legend.module.css';

const Legend = () => {
    const { sidebarTabOpen } = use(SidebarContext);

    return (
        <SidebarSection title="Tegnforklaring" isOpen={sidebarTabOpen === 'legend'}>
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
