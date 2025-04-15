import { TILSYN_STATUS } from '../../lib/tilsynStatus';
import styles from './Legend.module.css';

const Legend = () => {
    return (
        <ul className={styles.legend}>
            {TILSYN_STATUS.map((status, index) => (
                <li key={index}>
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
    );
};

export default Legend;
