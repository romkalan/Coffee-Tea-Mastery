import classNames from "classnames";
import type { TTerritory, TTerritoryStatus } from "../../../types/map.ts";
import styles from "./styles.module.scss";

interface ProgressOverlayProps {
    territory: TTerritory;
    status: TTerritoryStatus;
}

function ProgressOverlay({ territory, status }: ProgressOverlayProps) {
    if (status === "locked") return null;

    return (
        <g className={classNames(styles.progressOverlay)}>
            {territory.paths.map((_, i) => (
                <path
                    key={i}
                    d={territory.paths[i]}
                    fill="none"
                    stroke={territory.color}
                    strokeWidth={i === 0 ? 2 : 0}
                    strokeOpacity={0.6}
                    className={classNames(
                        styles.progressBorder,
                        status === "completed" && styles.progressBorderCompleted
                    )}
                />
            ))}

            {status === "completed" && (
                <path
                    d={territory.paths[0]}
                    fill={territory.color}
                    fillOpacity={0.15}
                    className={classNames(styles.completedGlow)}
                />
            )}
        </g>
    );
}

export default ProgressOverlay;
