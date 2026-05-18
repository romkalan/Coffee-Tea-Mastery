import classNames from "classnames";
import styles from "./styles.module.scss";
import type {TWinner} from "../../types/winner.ts";

interface WinnerProps {
    winner: TWinner;
}

function Winner({winner}: WinnerProps) {
    return (
        <div className={classNames(styles.root)}>
            <h3 className={classNames(styles.year)}>{winner.year}</h3>
            <img className={classNames(styles.image)} src={winner.photo} alt={winner.name} />
            <div className={classNames(styles.info)}>
                <span>{winner.region}</span>
                <span className={classNames(styles.name)}>{winner.name}</span>
            </div>
        </div>
    );
}

export default Winner;
