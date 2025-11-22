import classNames from "classnames";
import styles from "./styles.module.scss";
import FilterMenu from "../../components/FilterMenu/FilterMenu.tsx";
import NewsCard from "../../components/NewsCard/NewsCard.tsx";
import {news} from "../../mocks/news.ts";
import type {TNew} from "../../types/new.ts";
import {sortByDate} from "../../utils/utils.ts";
import SliderButtons from "../../components/SliderButtons/SliderButtons.tsx";
import useEmblaCarousel from "embla-carousel-react";
import {useCallback, useEffect, useState} from "react";


function News() {
    if (news.length === 0) {
        return null;
    }

    const currentNews = sortByDate(news.slice(0,4));

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
        console.log('пытаюсь крутить назад');
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
        console.log('пытаюсь крутить вперед');
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
            <h1 className={classNames(styles.title)}>Новости</h1>
            <FilterMenu/>
            <ul className={classNames(styles.newsList)}>
                {currentNews.map((newInfo: TNew, index) => (
                    <NewsCard key={newInfo.id} newInfo={newInfo} index={index}/>
                ))}
            </ul>
            <SliderButtons
                prevButton={scrollPrev}
                nextButton={scrollNext}
                currentSlide={selectedIndex}
                totalSlides={news.length}
            />
        </div>
    );
}

export default News;
