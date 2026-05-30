import useEmblaCarousel from "embla-carousel-react";
import {useCallback, useEffect, useState} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import SliderButtons from "../SliderButtons/SliderButtons.tsx";

interface ServiceTestimonialsProps {
    reviews: string[];
}

function ServiceTestimonials({reviews}: ServiceTestimonialsProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        slidesToScroll: 1,
        containScroll: "trimSnaps",
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
        emblaApi.on("select", onSelect);
        return () => {emblaApi.off("select", onSelect);};
    }, [emblaApi, onSelect]);

    if (!reviews || reviews.length === 0) return null;

    return (
        <div className={classNames(styles.root)}>
            <h2 className={classNames(styles.title)}>Отзывы наших клиентов</h2>
            <div className={classNames(styles.embla)} ref={emblaRef}>
                <div className={classNames(styles.list)}>
                    {reviews.map((review, index) => (
                        <div key={index} className={classNames(styles.slide)}>
                            <div className={classNames(styles.card)}>
                                <svg className={classNames(styles.quoteIcon)} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                                </svg>
                                <p className={classNames(styles.text)}>{review}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <SliderButtons
                prevButton={scrollPrev}
                nextButton={scrollNext}
                currentSlide={selectedIndex}
                totalSlides={scrollSnaps.length}
            />
        </div>
    );
}

export default ServiceTestimonials;
