import classNames from "classnames";
import styles from "./styles.module.scss";
import Hero from "../../components/Hero/Hero.tsx";
import Experience from "../../components/Experience/Experience.tsx";
import About from "../../components/About/About.tsx";
import TrainingCenter from "../../components/TrainingCenter/TrainingCenter.tsx";
import Advantages from "../../components/Advantages/Advantages.tsx";

function Main() {
    return (
        <div className={classNames(styles.root)}>
            <Hero />
            <Experience />
            <About />
            <TrainingCenter />
            <Advantages />
        </div>
    );
}

export default Main;
