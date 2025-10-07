import classNames from "classnames";
import styles from "./styles.module.scss";
import type {TService} from "../../types/service.ts";
import {Link} from "react-router-dom";
import type {TCourse} from "../../types/course.ts";

interface ServiceProps {
    service: TService | TCourse;
}

function Service({service}: ServiceProps) {
    const buttonText = 'date' in service ? 'Записаться' : 'Подробнее';

    return (
        <li className={classNames(styles.root)}>
            <div className={classNames(styles.image)}>
                <img src={service.image} alt="Фотография услуги"/>
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
                    {"date" in service &&
                        (<div className={classNames(styles.descriptionText)}>
                            <span>Дата</span>
                            <span>{service.date}</span>
                        </div>)
                    }
                </div>
                <Link to={`/services/${service.id}`} className={classNames(styles.linkButton)}>{buttonText}</Link>
            </div>
        </li>
    );
}

export default Service;
