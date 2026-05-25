import { useState, useCallback } from "react";
import classNames from "classnames";
import type { TTerritoryStatus, TTooltipData } from "../../types/map.ts";
import { territories, routes, MAP_VIEWBOX } from "../../data/mapTerritories.ts";
import MapBackground from "./MapBackground/MapBackground.tsx";
import TerritoryLayer from "./TerritoryLayer/TerritoryLayer.tsx";
import RouteLayer from "./RouteLayer/RouteLayer.tsx";
import ProgressOverlay from "./ProgressOverlay/ProgressOverlay.tsx";
import MapTooltip from "./MapTooltip/MapTooltip.tsx";
import MapLegend from "./MapLegend/MapLegend.tsx";
import styles from "./styles.module.scss";

interface TSkillArea {
    id: string;
    label: string;
    color: string;
    courseIds: string[];
}

interface TUserCourse {
    courseId: string;
    status: string;
}

interface FantasyMapProps {
    skillAreas: TSkillArea[];
    userCourses: TUserCourse[];
    onTerritoryClick?: (territoryId: string) => void;
}

function getTerritoryStatus(
    territoryCourses: string[],
    userCourses: TUserCourse[]
): TTerritoryStatus {
    const anyCompleted = userCourses.some(
        (uc) =>
            territoryCourses.includes(uc.courseId) && uc.status === "completed"
    );
    if (anyCompleted) return "completed";

    const anyEnrolled = userCourses.some(
        (uc) =>
            territoryCourses.includes(uc.courseId) && uc.status === "enrolled"
    );
    if (anyEnrolled) return "inProgress";

    return "locked";
}

function getCompletedCount(
    territoryCourses: string[],
    userCourses: TUserCourse[]
): number {
    return userCourses.filter(
        (uc) =>
            territoryCourses.includes(uc.courseId) && uc.status === "completed"
    ).length;
}

function FantasyMap({ skillAreas, userCourses, onTerritoryClick }: FantasyMapProps) {
    const [tooltip, setTooltip] = useState<TTooltipData | null>(null);

    const handleMouseEnter = useCallback(
        (e: React.MouseEvent, territoryId: string) => {
            const territory = territories.find((t) => t.id === territoryId);
            const skillArea = skillAreas.find((sa) => sa.id === territoryId);
            if (!territory || !skillArea) return;

            const totalCount = territory.courseIds.length;
            const completedCount = getCompletedCount(territory.courseIds, userCourses);
            const status = getTerritoryStatus(territory.courseIds, userCourses);

            const rect = (e.currentTarget as SVGGElement).getBoundingClientRect();
            const parentRect = (e.currentTarget as SVGGElement)
                .closest('[data-map-root]')
                ?.getBoundingClientRect() || rect;

            setTooltip({
                label: territory.label,
                description: territory.description,
                completedCount,
                totalCount,
                status,
                x: rect.left - (parentRect?.left || 0) + rect.width / 2,
                y: rect.top - (parentRect?.top || 0) - 8,
            });
        },
        [skillAreas, userCourses]
    );

    const handleMouseLeave = useCallback(() => {
        setTooltip(null);
    }, []);

    const handleClick = useCallback(
        (territoryId: string) => {
            if (onTerritoryClick) {
                onTerritoryClick(territoryId);
            }
        },
        [onTerritoryClick]
    );

    if (skillAreas.length === 0) return null;

    return (
        <div className={classNames(styles.root)} data-map-root="true">
            <svg
                viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
                className={classNames(styles.map)}
                role="img"
                aria-label="Фэнтезийная карта навыков"
            >
                <MapBackground />

                <RouteLayer routes={routes} territories={territories} />

                {territories.map((territory) => {
                    const status = getTerritoryStatus(
                        territory.courseIds,
                        userCourses
                    );
                    return (
                        <g
                            key={territory.id}
                            className={classNames(
                                styles.territoryGroup,
                                styles[`status_${status}` as keyof typeof styles]
                            )}
                            onMouseEnter={(e) => handleMouseEnter(e, territory.id)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(territory.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <TerritoryLayer
                                territory={territory}
                                status={status}
                            />
                            <ProgressOverlay
                                territory={territory}
                                status={status}
                            />
                        </g>
                    );
                })}

                <text
                    x={MAP_VIEWBOX.width / 2}
                    y={40}
                    textAnchor="middle"
                    className={classNames(styles.mapTitle)}
                >
                    Карта Мастерства
                </text>
            </svg>

            {tooltip && <MapTooltip data={tooltip} />}
            <MapLegend />
        </div>
    );
}

export default FantasyMap;
