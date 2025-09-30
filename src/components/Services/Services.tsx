import classNames from "classnames";
import styles from "./styles.module.scss";
import Service from "../Service/Service.tsx";
import type {TService} from "../../types/service.ts";
import SliderButtons from "../SliderButtons/SliderButtons.tsx";

interface ServicesProps {
    children: string;
    services: TService[];
}

function Services({children, services}: ServicesProps) {
    return (
        <div className={classNames(styles.root)}>
            <h2 className={classNames(styles.title)}>
                {children}
            </h2>
            <ul className={classNames(styles.list)}>
                {services.map((service) => (
                    <Service key={service.id} service={service}/>
                ))}
            </ul>
            <SliderButtons />
        </div>
    );
}

export default Services;
