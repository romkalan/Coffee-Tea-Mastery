import classNames from "classnames";
import styles from "./styles.module.scss";
import {NavLink} from "react-router";
import type {TService} from "../../types/service.ts";

export interface ServiceProps {
    service: TService;
}

function Service({service}: ServiceProps) {
    return (
        <li className={classNames(styles.root)}>
            <div className={classNames(styles.image)}>
                <img src={"src/assets/serviceImage.jpg"} alt="Фотография услуги"/>
            </div>
            <div className={classNames(styles.description)}>
                <h3 className={classNames(styles.descriptionTitle)}>
                    {service.title}
                </h3>
                <div className={classNames(styles.descriptionInfo)}>
                    <div className={classNames(styles.descriptionText)}>
                        <span>Стоимость</span>
                        <span>{service.price} руб.</span>
                    </div>
                    <div className={classNames(styles.descriptionText)}>
                        <span>Время</span>
                        <span>{service.time}</span>
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
