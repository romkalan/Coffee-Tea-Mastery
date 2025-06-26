import classNames from "classnames";
import styles from "./styles.module.scss";
import {NavLink} from "react-router";
import {Link} from "react-router-dom";

function Header() {
    return (
        <div className={classNames(styles.root)}>
            <Link className={classNames(styles.logo, styles.link)} to={"/"}>
                <img className={classNames(styles.logoImage)} src={"src/assets/Logo.png"} alt="Bee Barista Logo"/>
                <div className={classNames(styles.logoText)}>
                    <h2 className={classNames(styles.logoTitle)}>Bee Barista</h2>
                    <h3 className={classNames(styles.logoSubTitle)}>Sip Learn Repeat</h3>
                </div>
            </Link>
            <nav className={classNames(styles.headerPages)}>
                <NavLink to={"/"}
                         className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}>Главная</NavLink>
                <NavLink to={"/news"}
                         className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}>Новости</NavLink>
                <NavLink to={"/courses"}
                         className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}>Курсы</NavLink>
                <NavLink to={"/championships"}
                         className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}>Чемпионаты</NavLink>
            </nav>
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
