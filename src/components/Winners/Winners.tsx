import style from "./styles.module.scss";
import classNames from "classnames";
import {winners} from "../../mocks/winners.ts";
import Winner from "../Winner/Winner.tsx";
import SliderButtons from "../SliderButtons/SliderButtons.tsx";
import {useCallback, useEffect, useState} from "react";
import useEmblaCarousel from "embla-carousel-react";

function Winners() {
    const lastWinners = winners.slice(0, 3);
    const [, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        slidesToScroll: 1,
        containScroll: 'trimSnaps'
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [, setScrollSnaps] = useState<number[]>([]);

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
        <div className={classNames(style.root)}>
            <h2 className={classNames(style.title)}>Победители чемпионата</h2>
            <ul className={classNames(style.winnersList)}>
                {lastWinners.map((winner) => (
                    <li key={winner.id} className={classNames(style.winner)}>
                        <Winner winner={winner} />
                    </li>
                ))}
            </ul>
            <SliderButtons
                prevButton={scrollPrev}
                nextButton={scrollNext}
                currentSlide={selectedIndex}
                totalSlides={winners.length}
            />
        </div>
    );
}

export default Winners;
