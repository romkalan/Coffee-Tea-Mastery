import classNames from "classnames";
import styles from "./styles.module.scss";
import Hero from "../../components/Hero/Hero.tsx";
import Experience from "../../components/Experience/Experience.tsx";
import About from "../../components/About/About.tsx";
import TrainingCenter from "../../components/TrainingCenter/TrainingCenter.tsx";
import Advantages from "../../components/Advantages/Advantages.tsx";
import Services from "../../components/Services/Services.tsx";
import { useGetServicesQuery } from "../../redux/services/api";
import {useEffect} from "react";

function MainServerTest() {
    const {
        data: servicesData,
        isLoading,
        error,
        refetch,
        isSuccess,
        isError,
        status
    } = useGetServicesQuery();

    // Отладка: логируем состояние запроса
    useEffect(() => {
        console.log('=== Состояние запроса услуг ===');
        console.log('статус:', status);
        console.log('загрузка:', isLoading);
        console.log('успех:', isSuccess);
        console.log('ошибка:', isError);

        if (servicesData) {
            console.log('получено услуг:', servicesData.length);
            console.log('данные:', servicesData);
        }

        if (error) {
            console.log('ошибка:', error);
        }
    }, [servicesData, isLoading, error, isSuccess, isError, status]);

    const allServices = servicesData || [];

    if (isLoading) {
        return (
            <div className={classNames(styles.root)}>
                <Hero />
                <Experience />
                <About />
                <TrainingCenter />
                <Advantages />
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Загрузка услуг...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(styles.root)}>
                <Hero />
                <Experience />
                <About />
                <TrainingCenter />
                <Advantages />
                <div className={styles.error}>
                    <p>Не удалось загрузить услуги</p>
                    <p className={styles.errorDetails}>
                        {JSON.stringify(error)}
                    </p>
                    <button onClick={refetch} className={styles.retryButton}>
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={classNames(styles.root)}>
            <Hero />
            <Experience />
            <About />
            <TrainingCenter />
            <Advantages />

            {allServices.length > 0 ? (
                <>
                    <Services services={allServices}>
                        Услуги для бизнеса
                    </Services>
                    <div className={styles.success}>
                        ✓ Загружено {allServices.length} услуг
                    </div>
                </>
            ) : (
                <div className={styles.noData}>
                    Нет доступных услуг
                </div>
            )}
        </div>
    );
}

export default MainServerTest;
