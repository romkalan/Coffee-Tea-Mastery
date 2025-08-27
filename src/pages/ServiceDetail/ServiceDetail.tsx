import classNames from "classnames";
import styles from "./styles.module.scss";
import type {TService} from "../../types/service.ts";
import {useParams} from "react-router";
import {useEffect} from "react";
import Service from "../../components/Service/Service.tsx";
import ServiceRequestFrom from "../../components/ServiceRequestForm/ServiceRequestForm.tsx";

interface ServiceProps {
    services: TService[];
}

function ServiceDetail({services}: ServiceProps) {
    const params = useParams();
    const service = services.find((service) => service.id === params.id);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [params.id]);

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
                    <h2 className={classNames(styles.previewTitle)}>{service.title}</h2>
                    <p className={classNames(styles.previewText)}>{service.description}</p>
                    <div className={classNames(styles.previewInfoDetails)}>
                        <div><p><b>Время:</b></p>{service.time}</div>
                        <div><p><b>Стоимость:</b></p>От {service.price} руб</div>
                        <div><p><b>Формат:</b></p>{service.format}</div>
                        <button className={classNames(styles.previewButton)}>Оставить заявку</button>
                    </div>
                </div>
            </div>
            <div className={classNames(styles.serviceRequestForm)}>
                <h2 className={classNames(styles.subtitle)}>Оставить заявку</h2>
                <ServiceRequestFrom />
            </div>
            <div className={classNames(styles.anotherServices)}>
                <h2 className={classNames(styles.subtitle)}>Другие услуги</h2>
                <ul className={classNames(styles.carouselList)}>
                    {services.sort((() => Math.random() - 0.5)).slice(0, 3).map((service) => (
                        <Service key={service.id} service={service}/>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ServiceDetail;
