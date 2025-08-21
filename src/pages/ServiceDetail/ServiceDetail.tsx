import classNames from "classnames";
import styles from "./styles.module.scss";
import {useParams} from "react-router";
import type {TService} from "../../types/service.ts";

export interface ServiceProps {
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
            <h1>This is Detailing Page of {service.title}</h1>
            <p>{service.description}</p>
        </div>
    );
}

export default ServiceDetail;
