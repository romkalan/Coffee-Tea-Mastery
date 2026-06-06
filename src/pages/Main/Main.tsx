import classNames from "classnames";
import styles from "./styles.module.scss";
import Hero from "../../components/Hero/Hero.tsx";
import Experience from "../../components/Experience/Experience.tsx";
import About from "../../components/About/About.tsx";
import TrainingCenter from "../../components/TrainingCenter/TrainingCenter.tsx";
import Advantages from "../../components/Advantages/Advantages.tsx";
import Services from "../../components/Services/Services.tsx";
import {useGetServicesQuery} from "../../redux/services/api.ts";
import Skeleton from "../../components/Skeleton/Skeleton.tsx";
import ErrorState from "../../components/ErrorState/ErrorState.tsx";
import EmptyState from "../../components/EmptyState/EmptyState.tsx";

function Main() {
    const {data: allServices, isLoading, error, refetch} = useGetServicesQuery();

    return (
        <div className={classNames(styles.root, "page")}>
            <Hero />
            <Experience />
            <About />
            <TrainingCenter />
            <Advantages />
            {isLoading ? (
                <Skeleton variant="card" count={4} />
            ) : error ? (
                <ErrorState onRetry={refetch} />
            ) : allServices && allServices.length > 0 ? (
                <Services services={allServices}>Услуги для бизнеса</Services>
            ) : (
                <EmptyState message="Услуги пока не добавлены" />
            )}
        </div>
    );
}

export default Main;

