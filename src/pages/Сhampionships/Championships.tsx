import classNames from "classnames";
import styles from "./styles.module.scss";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs.tsx";
import AboutCompetition from "../../components/AboutCompetition/AboutCompetition.tsx";
import CompetitiveTask from "../../components/CompetitveTask/CompetitiveTask.tsx";
import ChampionshipCycle from "../../components/ChampionshipCycle/ChampionshipCycle.tsx";
import Winners from "../../components/Winners/Winners.tsx";
import Partners from "../../components/Partners/Partners.tsx";

function ChampionshipsPage() {
    return (
        <div className={classNames(styles.root, "page")}>
            <Breadcrumbs crumbs={[
                { label: "Главная", href: "/" },
                { label: "Чемпионаты" },
            ]} />
            <AboutCompetition />
            <CompetitiveTask />
            <ChampionshipCycle/>
            <Winners />
            <Partners />
        </div>
    );
}

export default ChampionshipsPage;
