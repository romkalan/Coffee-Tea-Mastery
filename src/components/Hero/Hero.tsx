import styles from "./styles.module.scss";
import classNames from "classnames";
import {NavLink} from "react-router";

function Hero() {
    return (
        <div className={classNames(styles.root)}>
            <div className={classNames(styles.heroText)}>
                <h3 className={classNames(styles.heroTitle)}>Мастерство приготовления<br/>кофе и чая</h3>
                <p className={classNames(styles.heroSpan)}>Где каждый глоток - новое знание!</p>
                <NavLink to="/courses?section=training-center" className={classNames(styles.heroButton)}>Подобрать курс</NavLink>
            </div>
            <img className={classNames(styles.heroImage)} src={"/images/coffeeBeans.png"} alt="Кофейные зерна" loading="lazy"/>
        </div>
    );
}

export default Hero;
