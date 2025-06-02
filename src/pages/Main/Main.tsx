import classNames from "classnames";
import styles from "./styles.module.scss";
import Hero from "../../components/Hero/Hero.tsx";
import Experience from "../../components/Experience/Experience.tsx";
import About from "../../components/About/About.tsx";

function Main() {
    return (
        <div className={classNames(styles.root)}>
            <Hero />
            <Experience />
            <About />
        </div>
    );
}

export default Main;
