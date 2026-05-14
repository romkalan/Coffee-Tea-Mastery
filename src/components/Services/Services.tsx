import useEmblaCarousel from 'embla-carousel-react';
import {useCallback, useEffect, useState} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import Service from "../Service/Service.tsx";
import type {TService} from "../../types/service.ts";
import SliderButtons from "../SliderButtons/SliderButtons.tsx";
import type {TCourse} from "../../types/course.ts";

interface ServicesProps {
    children: string;
    services: TService[] | TCourse[];
}

function Services({children, services}: ServicesProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
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
        <div className={classNames(styles.root)} role="region" aria-roledescription="carousel" aria-label={children}>
            <h2 className={classNames(styles.title)}>
                {children}
            </h2>
            <div className={classNames(styles.slider)} ref={emblaRef}>
                <ul className={classNames(styles.list)}>
                    {services.map((service) => (
                        <div className={classNames(styles.cardSlide)} key={service.id}>
                            <Service service={service}/>
                        </div>
                    ))}
                </ul>
            </div>
            <SliderButtons
                prevButton={scrollPrev}
                nextButton={scrollNext}
                currentSlide={selectedIndex}
                totalSlides={services.length}
            />
        </div>
    );
}

export default Services;
