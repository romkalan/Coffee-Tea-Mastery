import classNames from "classnames";
import styles from "./styles.module.scss";
import type {TService} from "../../types/service.ts";
import {useParams} from "react-router";
import {useEffect} from "react";
import ServiceRequestFrom from "../../components/ServiceRequestForm/ServiceRequestForm.tsx";
import ServiceOptionsBlock from "../../components/ServiceOptionsBlock/ServiceOptionsBlock.tsx";
import Services from "../../components/Services/Services.tsx";
import DetailServiceInfo from "../../components/DetailServiceInfo/DetailServiceInfo.tsx";

interface ServiceProps {
    services: TService[];
}

function ServiceDetail({services}: ServiceProps) {
    const params = useParams();
    const service = services.find((service) => service.id === params.id);
    const anotherServices = services.sort((() => Math.random() - 0.5)).slice(0, 3);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [params.id]);

    if (!service) {
        return null;
    }

    return (
        <div className={classNames(styles.root)}>
            <DetailServiceInfo service={service}/>
            <ServiceOptionsBlock options={service.options}/>
            <ServiceRequestFrom/>
            <Services services={anotherServices}>Другие услуги</Services>
        </div>
    );
}

export default ServiceDetail;
