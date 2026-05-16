import classNames from "classnames";
import styles from "./styles.module.scss";
import Disk from "../Disk/Disk.tsx";

function AboutCompetition() {
    return (
        <div className={classNames(styles.root)}>
            <h1 className={classNames(styles.title)}>Чемпионаты по компетенции <br/>Мастерство приготовления кофе и чая</h1>
            <div className={classNames(styles.description)}>
                <p>«Мастерство приготовления кофе и чая» — компетенция «Всероссийского чемпионатного движения по профессиональному мастерству», которая проходит в рамках реализации национального проекта «Молодежь и дети».</p>
                <div className={classNames(styles.disk)}><Disk/></div>
            </div>
            <a className={classNames(styles.link)} href={"https://pro.firpo.ru/"} target={"_blank"} rel="noopener noreferrer">Подробнее про чемпионатное движение</a>
        </div>
    );
}

export default AboutCompetition;
