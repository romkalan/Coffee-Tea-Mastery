import classNames from "classnames";
import styles from "./styles.module.scss";
import {NavLink} from "react-router";
import Logo from "../Logo/Logo.tsx";

function Header() {
    return (
        <div className={classNames(styles.root)}>
            <Logo />
            <nav className={classNames(styles.headerPages)}>
                <NavLink to={"/"}
                         className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}>Главная</NavLink>
                <NavLink to={"/news"}
                         className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}>Новости</NavLink>
                <NavLink to={"/courses"}
                         className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}>Курсы</NavLink>
                <NavLink to={"/services"}
                         className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}>Услуги</NavLink>
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
