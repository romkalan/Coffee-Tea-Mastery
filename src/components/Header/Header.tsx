import classNames from "classnames";
import styles from "./styles.module.scss";
import {NavLink, useNavigate, useLocation} from "react-router";
import Logo from "../Logo/Logo.tsx";
import {useState, useEffect} from "react";
import ModalLogin from "../ModalLogin/ModalLogin.tsx";
import MobileNav from "../MobileNav/MobileNav.tsx";
import {useAppSelector} from "../../redux/hooks/hooks.ts";
import {selectUser} from "../../redux/entities/auth";

function Header() {
    const user = useAppSelector(selectUser);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isProfilePage = location.pathname === "/profile";

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLoginClick = () => {
        if (user) {
            navigate("/profile");
        } else {
            setIsOpen(true);
        }
    };

    return (
        <div className={classNames(styles.root)}>
            <Logo />
            {isMobile ? (
                <>
                    <button
                        className={classNames(styles.menuButton)}
                        onClick={() => setIsMobileNavOpen(prev => !prev)}
                        aria-label={isMobileNavOpen ? "Закрыть меню" : "Открыть меню"}
                        aria-expanded={isMobileNavOpen}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <line x1="3" y1="12" x2="21" y2="12"/>
                            <line x1="3" y1="18" x2="21" y2="18"/>
                        </svg>
                        <span>Меню</span>
                    </button>
                    <MobileNav
                        isOpen={isMobileNavOpen}
                        onClose={() => setIsMobileNavOpen(false)}
                        onLoginClick={handleLoginClick}
                    />
                </>
            ) : (
                <>
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
                            <button onClick={handleLoginClick} className={classNames(isProfilePage && styles.helpersActive)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                                {user === null ? "Войти" : user.name}
                            </button>
                        </li>
                        <li>
                            <ModalLogin isOpen={isOpen} onClose={() => setIsOpen(false)}/>
                        </li>
                    </ul>
                </>
            )}
        </div>
    );
}

export default Header;
