import styles from "./styles.module.scss";
import classNames from "classnames";
import {useGetWinnersQuery} from "../../redux/services/api.ts";
import Winner from "../Winner/Winner.tsx";
import SliderButtons from "../SliderButtons/SliderButtons.tsx";
import {useCallback, useEffect, useState} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Skeleton from "../Skeleton/Skeleton.tsx";
import ErrorState from "../ErrorState/ErrorState.tsx";
import EmptyState from "../EmptyState/EmptyState.tsx";

function Winners() {
    const {data: winners, isLoading, error, refetch} = useGetWinnersQuery();
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
        if (!emblaApi) return;

        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());

        emblaApi.on('select', onSelect);

        return () => {emblaApi.off('select', onSelect);};
    }, [emblaApi, onSelect]);

    return (
        <div className={classNames(styles.root)}>
            <h2 className={classNames(styles.title)}>Победители чемпионата</h2>
            {isLoading ? (
                <Skeleton variant="card" count={3} />
            ) : error ? (
                <ErrorState onRetry={refetch} />
            ) : !winners || winners.length === 0 ? (
                <EmptyState message="Победители пока не добавлены" />
            ) : (
                <>
                    <div className={classNames(styles.embla)} ref={emblaRef}>
                        <ul className={classNames(styles.winnersList)}>
                            {winners.map((winner) => (
                                <li key={winner.id} className={classNames(styles.winner)}>
                                    <Winner winner={winner} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <SliderButtons
                        prevButton={scrollPrev}
                        nextButton={scrollNext}
                        currentSlide={selectedIndex}
                        totalSlides={scrollSnaps.length}
                    />
                </>
            )}
        </div>
    );
}

export default Winners;
