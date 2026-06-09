import {useState, useEffect, useCallback} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import Expert from "../Expert/Expert.tsx";
import {useGetExpertsQuery} from "../../redux/services/api.ts";
import Skeleton from "../Skeleton/Skeleton.tsx";
import ErrorState from "../ErrorState/ErrorState.tsx";
import EmptyState from "../EmptyState/EmptyState.tsx";
import SliderButtons from "../SliderButtons/SliderButtons.tsx";
import useEmblaCarousel from "embla-carousel-react";

function Experts() {
    const {data: experts, isLoading, error, refetch} = useGetExpertsQuery();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        slidesToScroll: 1,
        containScroll: 'trimSnaps'
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 767);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!emblaApi || !isMobile) return;

        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());

        emblaApi.on('select', onSelect);

        return () => {emblaApi.off('select', onSelect);};
    }, [emblaApi, onSelect, isMobile]);

    return (
        <div className={classNames(styles.root)}>
            <h2 className={classNames(styles.title)}>Наша команда экспертов</h2>
            {isLoading ? (
                <Skeleton variant="card" count={4} />
            ) : error ? (
                <ErrorState onRetry={refetch} />
            ) : !experts || experts.length === 0 ? (
                <EmptyState message="Эксперты пока не добавлены" />
            ) : isMobile ? (
                <>
                    <div className={classNames(styles.embla)} ref={emblaRef}>
                        <ul className={classNames(styles.expertsCarousel)}>
                            {experts.map((expert) =>
                                <li key={expert.id} className={classNames(styles.carouselItem)}>
                                    <Expert expert={expert} />
                                </li>
                            )}
                        </ul>
                    </div>
                    <SliderButtons
                        prevButton={scrollPrev}
                        nextButton={scrollNext}
                        currentSlide={selectedIndex}
                        totalSlides={scrollSnaps.length}
                    />
                </>
            ) : (
                <ul className={classNames(styles.expertsList)}>
                    {experts.map((expert) =>
                        <li key={expert.id}>
                            <Expert expert={expert} />
                        </li>)}
                </ul>
            )}
        </div>
    );
}

export default Experts;
