import classNames from "classnames";
import styles from "./styles.module.scss";
import {NavLink} from "react-router";
import {Link} from "react-router-dom";

function Header() {
    return (
        <div className={classNames(styles.root)}>
            <Link to={"/"}>
                <img className={classNames(styles.logo)} src={"src/assets/BBLogoDesktop.png"} alt="Bee Barista Logo"/>
            </Link>
            <nav className={classNames(styles.headerPages)}>
                <NavLink to={"/"}>Главная</NavLink>
                <NavLink to={"/news"}>Новости</NavLink>
                <NavLink to={"/courses"}>Курсы</NavLink>
                <NavLink to={"/championships"}>Чемпионаты</NavLink>
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
