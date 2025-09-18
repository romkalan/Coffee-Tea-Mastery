import styles from "./styles.module.scss";
import classNames from "classnames";
import {Link} from "react-router-dom";
import Disk from "../Disk/Disk.tsx";

function About() {
    return (
        <div className={classNames(styles.root)}>
            <div className={classNames(styles.title)}>
                <h2 className={classNames(styles.firstTitle)}>Sip Learn Repeat</h2>
                <h2 className={classNames(styles.secondTitle)}>To Achive Mastery</h2>
            </div>
            <div className={classNames(styles.disk)}><Disk/></div>
            <div className={classNames(styles.blockAboutText)}>
                <h3 className={classNames(styles.aboutUsTitle)}>О нас</h3>
                <div className={classNames(styles.text)}>
                    <p>Мы — команда энтузиастов, посвятивших себя мастерству приготовления кофе и чая.</p>
                    <p>С 2021 года мы обучаем бариста и ти-стейшн, проводим профессиональные чемпионаты и помогаем
                        бизнесу
                        раскрывать потенциал в кофейной и чайной индустрии.</p>
                    <p> Наша миссия — развивать культуру качественных напитков, объединять профессионалов и делиться
                        знаниями, которые вдохновляют. </p>
                    <p>Мы верим, что за каждой чашкой стоит история, мастерство и страсть. Присоединяйтесь к нашему
                        движению!</p>
                </div>
            </div>
            <Link className={classNames(styles.linkToCompetition)} to={"championships"}>Узнайте больше о
                компетенции</Link>
        </div>
    );
}

export default About;
