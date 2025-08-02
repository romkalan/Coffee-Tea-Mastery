import classNames from "classnames";
import styles from "./styles.module.scss";
import {NavLink} from "react-router";

function Service() {
    return (
        <li className={classNames(styles.root)}>
            <div className={classNames(styles.image)}>
                <img src={"src/assets/serviceImage.jpg"} alt="Фотография услуги"/>
            </div>
            <div className={classNames(styles.description)}>
                <h3 className={classNames(styles.descriptionTitle)}>
                    Обслуживание кофейного оборудования
                </h3>
                <div className={classNames(styles.descriptionInfo)}>
                    <div className={classNames(styles.descriptionText)}>
                        <span>Стоимость</span>
                        <span>10 000 руб.</span>
                    </div>
                    <div className={classNames(styles.descriptionText)}>
                        <span>Время</span>
                        <span>1 день</span>
                    </div>
                    <div className={classNames(styles.descriptionText)}>
                        <span>Формат</span>
                        <span>На выбор</span>
                    </div>
                </div>
                <NavLink to={"#"} className={classNames(styles.linkButton)}>Подробнее</NavLink>
            </div>
        </li>
    );
}

export default Service;
