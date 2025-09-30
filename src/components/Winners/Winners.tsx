import style from "./styles.module.scss";
import classNames from "classnames";
import {winners} from "../../mocks/winners.ts";
import Winner from "../Winner/Winner.tsx";
import SliderButtons from "../SliderButtons/SliderButtons.tsx";

function Winners() {
    return (
        <div className={classNames(style.root)}>
            <h2 className={classNames(style.title)}>Победители чемпионата</h2>
            <ul className={classNames(style.winnersList)}>
                {winners.map((winner) => (
                    <li key={winner.id} className={classNames(style.winner)}>
                        <Winner winner={winner} />
                    </li>
                ))}
            </ul>
            <SliderButtons />
        </div>
    );
}

export default Winners;
