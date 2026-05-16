import style from "./styles.module.scss";
import classNames from "classnames";
import {NavLink} from "react-router";

function Hero() {
    return (
        <div className={classNames(style.root)}>
            <div className={classNames(style.heroText)}>
                <h3 className={classNames(style.heroTitle)}>Мастерство приготовления<br/>кофе и чая</h3>
                <p className={classNames(style.heroSpan)}>Где каждый глоток - новое знание!</p>
                <NavLink to="/courses?section=training-center" className={classNames(style.heroButton)}>Подобрать курс</NavLink>
            </div>
            <img className={classNames(style.heroImage)} src={"/images/coffeeBeans.png"} alt="Кофейные зерна" loading="lazy"/>
        </div>
    );
}

export default Hero;
