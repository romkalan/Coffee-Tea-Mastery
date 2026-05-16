import classNames from "classnames";
import styles from "./styles.module.scss";
import type {TService} from "../../types/service.ts";
import {Navigate, useParams} from "react-router";
import {useEffect} from "react";
import ServiceRequestForm from "../../components/ServiceRequestForm/ServiceRequestForm.tsx";
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
        return <Navigate to="/not-found" replace />;
    }

    return (
        <div className={classNames(styles.root)}>
            <DetailServiceInfo service={service}/>
            <ServiceOptionsBlock actions={service.actions} results={service.results}/>
            <ServiceRequestForm/>
            <Services services={anotherServices}>Другие услуги</Services>
        </div>
    );
}

export default ServiceDetail;
