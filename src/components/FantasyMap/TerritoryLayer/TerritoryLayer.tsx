import classNames from "classnames";
import type { TTerritory, TTerritoryStatus } from "../../../types/map.ts";
import styles from "./styles.module.scss";

interface TerritoryLayerProps {
    territory: TTerritory;
    status: TTerritoryStatus;
}

function TerritoryLayer({ territory, status }: TerritoryLayerProps) {
    const fillColor =
        status === "locked"
            ? "#4a5568"
            : status === "inProgress"
                ? territory.color
                : territory.color;

    const strokeColor =
        status === "locked" ? "#2d3748" : territory.colorDarker;

    return (
        <g filter="url(#islandShadow)">
            {territory.paths.map((path, i) => (
                <path
                    key={i}
                    d={path}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={i === 0 ? 2 : 1}
                    strokeOpacity={i === 0 ? 0.9 : 0.4}
                    fillOpacity={
                        status === "locked"
                            ? 0.4
                            : status === "inProgress"
                                ? 0.5
                                : 1
                    }
                    className={classNames(
                        styles.territory,
                        i === 0 && styles.territoryMain,
                        i > 0 && styles.territoryIslet,
                        status === "locked" && styles.territoryLocked,
                        status === "inProgress" && styles.territoryProgress,
                        status === "completed" && styles.territoryCompleted
                    )}
                />
            ))}

            <text
                x={territory.labelX}
                y={territory.labelY}
                textAnchor="middle"
                dominantBaseline="central"
                fill={status === "locked" ? "#718096" : "#fff"}
                fillOpacity={status === "locked" ? 0.5 : 0.95}
                className={classNames(styles.territoryLabel)}
            >
                {territory.label}
            </text>
        </g>
    );
}

export default TerritoryLayer;
