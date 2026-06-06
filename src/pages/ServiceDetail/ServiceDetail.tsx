import classNames from "classnames";
import styles from "./styles.module.scss";
import {Navigate, useParams} from "react-router";
import {useEffect} from "react";
import ServiceRequestForm from "../../components/ServiceRequestForm/ServiceRequestForm.tsx";
import ServiceOptionsBlock from "../../components/ServiceOptionsBlock/ServiceOptionsBlock.tsx";
import Services from "../../components/Services/Services.tsx";
import DetailServiceInfo from "../../components/DetailServiceInfo/DetailServiceInfo.tsx";
import {useGetServiceByIdQuery, useGetServicesQuery} from "../../redux/services/api.ts";
import Skeleton from "../../components/Skeleton/Skeleton.tsx";
import ErrorState from "../../components/ErrorState/ErrorState.tsx";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs.tsx";

function ServiceDetail() {
    const params = useParams();
    const {data: service, isLoading, error, refetch} = useGetServiceByIdQuery(params.id!);
    const {data: allServices} = useGetServicesQuery();

    const scrollToForm = () => {
        const form = document.getElementById("request-form");
        if (form) {
            form.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (service) {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
    }, [params.id, service]);

    if (isLoading) return <Skeleton variant="card" count={3} />;
    if (error) return <ErrorState onRetry={refetch} />;
    if (!service) return <Navigate to="/not-found" replace />;

    const otherServices = allServices
        ? [...allServices].sort(() => Math.random() - 0.5).slice(0, 3)
        : [];

    return (
        <div className={classNames(styles.root, "page")}>
            <Breadcrumbs crumbs={[
                { label: "Главная", href: "/" },
                { label: "Услуги", href: "/services" },
                { label: service.title },
            ]} />
            <DetailServiceInfo service={service} onRequestClick={scrollToForm}/>
            <ServiceOptionsBlock actions={service.actions} results={service.results}/>
            <ServiceRequestForm/>
            {otherServices.length > 0 && (
                <Services services={otherServices}>Другие услуги</Services>
            )}
        </div>
    );
}

export default ServiceDetail;
