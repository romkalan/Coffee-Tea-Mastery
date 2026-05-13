import classNames from "classnames";
import style from "./styles.module.scss";
import type {TWinner} from "../../types/winner.ts";

interface WinnerProps {
    winner: TWinner;
}

function Winner({winner}: WinnerProps) {
    return (
        <div className={classNames(style.root)}>
            <h3 className={classNames(style.year)}>{winner.year}</h3>
            <img className={classNames(style.image)} src={winner.photo} alt={winner.name} />
            <div className={classNames(style.info)}>
                <span>{winner.region}</span>
                <span className={classNames(style.name)}>{winner.name}</span>
            </div>
        </div>
    );
}

export default Winner;
