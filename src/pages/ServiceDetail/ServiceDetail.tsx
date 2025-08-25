import classNames from "classnames";
import styles from "./styles.module.scss";
import {useParams} from "react-router";
import type {TService} from "../../types/service.ts";

interface ServiceProps {
    services: TService[];
}

function ServiceDetail({services}: ServiceProps) {
    const params = useParams();
    const service = services.find((service) => service.id === params.id);

    if (!service) {
        return null;
    }

    return (
        <div className={classNames(styles.root)}>
            <h1 className={classNames(styles.title)}>{service.type} / {service.title}</h1>
            <div className={classNames(styles.preview)}>
                <img className={classNames(styles.previewImage)} src={"../src/assets/serviceImage.jpg"}
                     alt="Фотография услуги"/>
                <div className={classNames(styles.previewInfo)}>
                    <p><b>Время освоения:</b> {service.time} </p>
                    <p><b>Формат обучения:</b> {service.format}</p>
                    <p className={classNames(styles.previewText)}>{service.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ServiceDetail;
