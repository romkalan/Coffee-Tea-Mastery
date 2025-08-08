import classNames from "classnames";
import styles from "./styles.module.scss";
import Service from "../Service/Service.tsx";
import {services} from "../../mocks/services.ts";

function Services() {
    const servicesForBusiness = services;

    return (
        <div className={classNames(styles.root)}>
            <h2 className={classNames(styles.title)}>
                Услуги для бизнеса
            </h2>
            <ul className={classNames(styles.list)}>
                {servicesForBusiness.map((service) => (
                    <Service key={service.id} service={service}/>
                ))}
            </ul>
        </div>
    );
}

export default Services;
