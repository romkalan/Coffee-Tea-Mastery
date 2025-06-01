import classNames from "classnames";
import styles from "./styles.module.scss";
import {NavLink} from "react-router";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <div className={classNames(styles.root)}>
            <Link to={"/"}>
                <img src={"src/assets/BBLogoTabletop.png"} alt="Bee Barista Logo"/>
            </Link>
            <nav className={classNames(styles.footerPages)}>
                <NavLink to={"/"}>Главная</NavLink>
                <NavLink to={"/news"}>Новости</NavLink>
                <NavLink to={"/courses"}>Курсы</NavLink>
                <NavLink to={"/championships"}>Чемпионаты</NavLink>
            </nav>
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
