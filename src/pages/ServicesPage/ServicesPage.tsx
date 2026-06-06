import classNames from "classnames";
import styles from "./styles.module.scss";
import Services from "../../components/Services/Services.tsx";
import {useGetServicesQuery} from "../../redux/services/api.ts";
import Skeleton from "../../components/Skeleton/Skeleton.tsx";
import ErrorState from "../../components/ErrorState/ErrorState.tsx";
import EmptyState from "../../components/EmptyState/EmptyState.tsx";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs.tsx";
import ServiceHero from "../../components/ServiceHero/ServiceHero.tsx";
import ServiceAudience from "../../components/ServiceAudience/ServiceAudience.tsx";
import ServiceProcess from "../../components/ServiceProcess/ServiceProcess.tsx";
import ServiceStats from "../../components/ServiceStats/ServiceStats.tsx";
import ServiceTestimonials from "../../components/ServiceTestimonials/ServiceTestimonials.tsx";
import FAQ from "../../components/FAQ/FAQ.tsx";
import ServiceRequestForm from "../../components/ServiceRequestForm/ServiceRequestForm.tsx";

function ServicesPage() {
    const {data: services, isLoading, error, refetch} = useGetServicesQuery();

    const allReviews = services
        ? services.flatMap(s => s.reviews || [])
        : [];

    if (error) return <ErrorState onRetry={refetch} />;

    return (
        <div className={classNames(styles.root, "page")}>
            <Breadcrumbs crumbs={[
                { label: "Главная", href: "/" },
                { label: "Услуги" },
            ]} />
            <ServiceHero />
            <ServiceAudience />
            {isLoading ? (
                <Skeleton variant="card" count={4} />
            ) : services && services.length > 0 ? (
                <Services services={services}>Все услуги</Services>
            ) : (
                <EmptyState message="Услуги пока не добавлены" />
            )}
            <ServiceProcess />
            <ServiceStats />
            {allReviews.length > 0 && (
                <ServiceTestimonials reviews={allReviews} />
            )}
            <FAQ />
            <ServiceRequestForm />
        </div>
    );
}

export default ServicesPage;
