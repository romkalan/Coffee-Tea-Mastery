import classNames from "classnames";
import styles from "./styles.module.scss";
import Hero from "../../components/Hero/Hero.tsx";
import Experience from "../../components/Experience/Experience.tsx";
import About from "../../components/About/About.tsx";
import TrainingCenter from "../../components/TrainingCenter/TrainingCenter.tsx";
import Advantages from "../../components/Advantages/Advantages.tsx";
import Services from "../../components/Services/Services.tsx";
import {services} from "../../mocks/services.ts";


function Main() {
    const allServices = services;

    return (
        <div className={classNames(styles.root)}>
            <Hero />
            <Experience />
            <About />
            <TrainingCenter />
            <Advantages />
            <Services services={allServices}>Услуги для бизнеса</Services>
        </div>
    );
}

export default Main;
