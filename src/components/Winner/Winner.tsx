import classNames from "classnames";
import styles from "./styles.module.scss";
import type {TWinner} from "../../types/winner.ts";

interface WinnerProps {
    winner: TWinner;
}

function Winner({winner}: WinnerProps) {
    return (
        <div className={classNames(styles.root)}>
            <div className={classNames(styles.content)}>
                <div className={classNames(styles.infoBlock)}>
                    <img className={classNames(styles.image)} src={winner.photo} alt={winner.name} />
                    <div className={classNames(styles.info)}>
                        <span className={classNames(styles.name)}>{winner.name}</span>
                        <span className={classNames(styles.region)}>{winner.region}</span>
                        <span className={classNames(styles.subtitle)}>Победитель чемпионата {winner.year} года</span>
                    </div>
                </div>
                <div className={classNames(styles.quoteBlock)}>
                    <p className={classNames(styles.quote)}>{winner.quote}</p>
                    <span className={classNames(styles.attribution)}>— {winner.name}</span>
                </div>
            </div>
        </div>
    );
}

export default Winner;
