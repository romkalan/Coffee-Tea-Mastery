import style from "./styles.module.scss";
import classNames from "classnames";

function Hero() {
    return (
        <div className={classNames(style.root)}>
            <div className={classNames(style.heroText)}>
                <h3 className={classNames(style.heroTitle)}>Мастерство приготовления кофе и чая</h3>
                <p className={classNames(style.heroSpan)}>Где каждый глоток - новое знание!</p>
                <button className={classNames(style.heroButton)}>Подобрать курс</button>
            </div>
            <img className={classNames(style.heroImage)} src={"/images/coffeeBeans.png"} alt="Кофейные зерна"/>
        </div>
    );
}

export default Hero;
