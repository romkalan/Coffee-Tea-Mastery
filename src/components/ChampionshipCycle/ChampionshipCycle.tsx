import classNames from "classnames";
import styles from "./styles.module.scss";
import ChampionshipStage from "../ChampionshipStage/ChampionshipStage.tsx";
import {championshipStages} from "../../mocks/championshipStages.ts";

function ChampionshipCycle() {
    return (
        <div className={classNames(styles.root)}>
            <h1 className={classNames(styles.title)}>Чемпионатный цикл</h1>
            <div className={classNames(styles.timeline)}>
                <div className={classNames(styles.centerLine)}></div>
                <ul className={classNames(styles.stageList)}>
                    {championshipStages.map((stage, index) => (
                        <li className={classNames(styles.stageItem, index % 2 === 0 ? styles.left : styles.right)}
                            key={stage.id}>
                            <ChampionshipStage stage={stage}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ChampionshipCycle;
