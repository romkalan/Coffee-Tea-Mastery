import Services from "../../components/Services/Services.tsx";
import {useGetServicesQuery} from "../../redux/services/api.ts";
import Skeleton from "../../components/Skeleton/Skeleton.tsx";
import ErrorState from "../../components/ErrorState/ErrorState.tsx";
import EmptyState from "../../components/EmptyState/EmptyState.tsx";

function ServicesPage() {
    const {data: services, isLoading, error, refetch} = useGetServicesQuery();

    if (isLoading) return <Skeleton variant="card" count={4} />;
    if (error) return <ErrorState onRetry={refetch} />;

    return (
        <div>
            {services && services.length > 0 ? (
                <Services services={services}>Услуги для бизнеса</Services>
            ) : (
                <EmptyState message="Услуги пока не добавлены" />
            )}
        </div>
    );
}

export default ServicesPage;
