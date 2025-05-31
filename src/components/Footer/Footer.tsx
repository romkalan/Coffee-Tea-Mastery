import classNames from "classnames";
import styles from "./styles.module.scss";

function Footer() {
    return (
        <div className={classNames(styles.root)}>
            <a href="#">
                <img src={"src/assets/BBLogoTabletop.png"} alt="Bee Barista Logo"/>
            </a>
            <ul className={classNames(styles.footerPages)}>
                <li>Главная</li>
                <li>Новости</li>
                <li>Курсы</li>
                <li>Чемпионаты</li>
            </ul>
            <button className={classNames(styles.feedback)}>
                Оставьте нам сообщение
            </button>
            <ul className={classNames(styles.socials)}>
                <li>
                    <a>VK</a>
                </li>
                <li>
                    <a>YT</a>
                </li>
                <li>
                    <a>TG</a>
                </li>
            </ul>
        </div>
    );
}

export default Footer;
