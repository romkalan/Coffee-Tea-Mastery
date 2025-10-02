import style from "./styles.module.scss"
import classNames from "classnames";

function SliderButtons() {
    return (
        <div className={classNames(style.root)}>
            <button className={classNames(style.button)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8 12L15.4 16.6L14 18L8 12L14 6L15.4 7.4L10.8 12Z" fill="#4D0505"/>
                </svg>
            </button>
            <div className={classNames(style.pages)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#D2691E" fillOpacity="1"/>
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#D2691E" fillOpacity="0.3"/>
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#D2691E" fillOpacity="0.3"/>
                </svg>
            </div>
            <button className={classNames(style.button)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.2 12L8.6 7.4L10 6L16 12L10 18L8.6 16.6L13.2 12Z" fill="#4D0505"/>
                </svg>
            </button>
        </div>
    );
}

export default SliderButtons;
