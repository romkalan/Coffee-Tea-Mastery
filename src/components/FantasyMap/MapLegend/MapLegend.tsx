import classNames from "classnames";
import styles from "./styles.module.scss";

function MapLegend() {
    return (
        <div className={classNames(styles.legend)}>
            <div className={classNames(styles.legendTitle)}>Легенда</div>
            <div className={classNames(styles.legendItem)}>
                <span
                    className={classNames(styles.legendDot)}
                    style={{ background: "#ffd700", opacity: 1 }}
                />
                <span>Пройдено</span>
            </div>
            <div className={classNames(styles.legendItem)}>
                <span
                    className={classNames(styles.legendDot)}
                    style={{
                        background:
                            "linear-gradient(135deg, #ffd700 40%, #4a5568 60%)",
                        opacity: 0.7,
                    }}
                />
                <span>В процессе</span>
            </div>
            <div className={classNames(styles.legendItem)}>
                <span
                    className={classNames(styles.legendDot)}
                    style={{ background: "#4a5568", opacity: 0.5 }}
                />
                <span>Закрыто</span>
            </div>
        </div>
    );
}

export default MapLegend;
