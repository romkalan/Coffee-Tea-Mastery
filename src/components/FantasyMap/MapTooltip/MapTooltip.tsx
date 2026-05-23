import classNames from "classnames";
import type { TTooltipData } from "../../../types/map.ts";
import styles from "./styles.module.scss";

interface MapTooltipProps {
    data: TTooltipData;
}

const statusLabels: Record<string, string> = {
    locked: "Закрыто",
    inProgress: "В процессе",
    completed: "Пройдено",
};

function MapTooltip({ data }: MapTooltipProps) {
    return (
        <div
            className={classNames(styles.tooltip)}
            style={{
                left: data.x,
                top: data.y,
            }}
        >
            <div className={classNames(styles.tooltipTitle)}>{data.label}</div>
            <div className={classNames(styles.tooltipDesc)}>
                {data.description}
            </div>
            <div className={classNames(styles.tooltipProgress)}>
                Прогресс: {data.completedCount}/{data.totalCount} курсов
            </div>
            <div
                className={classNames(
                    styles.tooltipStatus,
                    styles[`tooltipStatus_${data.status}`]
                )}
            >
                {statusLabels[data.status] || data.status}
            </div>
        </div>
    );
}

export default MapTooltip;
