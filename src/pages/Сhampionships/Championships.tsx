import classNames from "classnames";
import styles from "./styles.module.scss";
import AboutCompetition from "../../components/AboutCompetition/AboutCompetition.tsx";
import CompetitiveTask from "../../components/CompetitveTask/CompetitiveTask.tsx";

function ChampionshipsPage() {
    return (
        <div className={classNames(styles.root)}>
            <AboutCompetition />
            <CompetitiveTask />
        </div>
    );
}

export default ChampionshipsPage;
