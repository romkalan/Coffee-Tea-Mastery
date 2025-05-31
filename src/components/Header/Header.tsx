import classNames from "classnames";
import styles from "./styles.module.scss";

function Header() {
    return (
        <div className={classNames(styles.root)}>
            <a>
                <img className={classNames(styles.logo)} src={"src/assets/BBLogoDesktop.png"} alt="Bee Barista Logo"/>
            </a>
            <ul className={classNames(styles.headerPages)}>
                <li>Главная</li>
                <li>Новости</li>
                <li>Курсы</li>
                <li>Чемпионаты</li>
            </ul>
            <ul className={classNames(styles.helpers)}>
                <li>
                    <button>Сменить тему</button>
                </li>
                <li>
                    <button>Поиск</button>
                </li>
                <li>
                    <button>Почта</button>
                </li>
                <li>
                    <button>Личный кабинет</button>
                </li>
            </ul>
        </div>
    );
}

export default Header;
