import styles from "./styles.module.scss";
import classNames from "classnames";

function ServiceHero() {
    const handleScroll = () => {
        const form = document.getElementById("request-form");
        if (form) {
            form.scrollIntoView({behavior: "smooth"});
        }
    };

    return (
        <div className={classNames(styles.root)}>


            <div className={classNames(styles.content)}>
                <h3 className={classNames(styles.subtitle)}>Профессиональные решения</h3>
                <h1 className={classNames(styles.title)}>Услуги для вашего бизнеса</h1>
                <p className={classNames(styles.description)}>
                    От диагностики оборудования до разработки меню и обучения команды —
                    помогаем кофейням, ресторанам и отелям работать лучше
                </p>
                <button className={classNames(styles.ctaButton)} onClick={handleScroll}>
                    Оставить заявку
                </button>
            </div>
        </div>
    );
}

export default ServiceHero;
