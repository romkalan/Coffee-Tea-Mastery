import styles from "./styles.module.scss"
import classNames from "classnames";

interface SliderButtonsProps {
    prevButton: () => void;
    nextButton: () => void;
    currentSlide: number;
    totalSlides: number;
}

function SliderButtons({prevButton, nextButton, currentSlide, totalSlides}: SliderButtonsProps) {
    const getDotOpacity = (dotIndex: number) => {
        // Если слайдов меньше 3, показываем реальные точки
        if (totalSlides <= 3) {
            return dotIndex === currentSlide ? 1 : 0.3;
        }

        // Для большего количества слайдов используем логику трех точек
        if (currentSlide === 0) {
            // Первый слайд - активна первая точка
            return dotIndex === 0 ? 1 : 0.3;
        } else if (currentSlide === totalSlides - 3) {
            // Последний слайд - активна последняя точка
            return dotIndex === 2 ? 1 : 0.3;
        } else {
            // Средние слайды - активна центральная точка
            return dotIndex === 1 ? 1 : 0.3;
        }
    };

    return (
        <div className={classNames(styles.root)}>
            <button className={classNames(styles.button)} onClick={prevButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8 12L15.4 16.6L14 18L8 12L14 6L15.4 7.4L10.8 12Z" fill="currentColor"/>
                </svg>
            </button>
            <div className={classNames(styles.pages)}>
                <svg className={classNames(styles.dot)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity={getDotOpacity(0)}/>
                </svg>
                <svg className={classNames(styles.dot)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity={getDotOpacity(1)}/>
                </svg>
                <svg className={classNames(styles.dot)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity={getDotOpacity(2)}/>
                </svg>
            </div>
            <button className={classNames(styles.button)} onClick={nextButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.2 12L8.6 7.4L10 6L16 12L10 18L8.6 16.6L13.2 12Z" fill="currentColor"/>
                </svg>
            </button>
        </div>
    );
}

export default SliderButtons;
