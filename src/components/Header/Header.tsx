import classNames from "classnames";
import styles from "./styles.module.scss";
import {NavLink, useNavigate} from "react-router";
import Logo from "../Logo/Logo.tsx";
import {useState} from "react";
import ModalLogin from "../ModalLogin/ModalLogin.tsx";
import {useAppSelector} from "../../redux/hooks/hooks.ts";
import {selectUser} from "../../redux/entities/auth";

function Header() {
    const user = useAppSelector(selectUser);
    const [isOpen, setIsOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const userName = user === null ? "Войти" : user.name;

    const handleLoginClick = () => {
        if (user) {
            setShowMenu(!showMenu);
        } else {
            setIsOpen(true);
        }
    };

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
                    <button onClick={handleLoginClick}>
                        {userName}
                    </button>
                    {showMenu && user && (
                        <div className={classNames(styles.userMenu)}>
                            <button onClick={() => { navigate("/profile"); setShowMenu(false); }}>
                                Личный кабинет
                            </button>
                        </div>
                    )}
                </li>
                <li>
                    <ModalLogin isOpen={isOpen} onClose={() => setIsOpen(false)}/>
                </li>
            </ul>
        </div>
    );
}

export default Header;
