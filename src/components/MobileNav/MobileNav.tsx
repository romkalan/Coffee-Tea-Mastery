import {createPortal} from "react-dom";
import classNames from "classnames";
import styles from "./styles.module.scss";
import {NavLink, useNavigate} from "react-router";
import {useEffect, useRef} from "react";
import {useAppSelector} from "../../redux/hooks/hooks.ts";
import {selectUser} from "../../redux/entities/auth";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

function MobileNav({isOpen, onClose}: MobileNavProps) {
    const containerRef = useRef<Element | null>(null);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        containerRef.current = document.getElementById("mobile-nav-container");
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    const handleNavClick = () => {
        onClose();
    };

    if (!containerRef.current) return null;

    return createPortal(
        <>
            <div
                className={classNames(styles.overlay, isOpen && styles.visible)}
                onClick={onClose}
            />
            <div
                className={classNames(styles.panel, isOpen && styles.visible)}
                role="dialog"
                aria-modal="true"
                aria-label="Навигация"
            >
                <ul className={classNames(styles.navList)}>
                    <li>
                        <NavLink
                            to="/"
                            onClick={handleNavClick}
                            className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}
                            end
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/news"
                            onClick={handleNavClick}
                            className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}
                        >
                            Новости
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/courses"
                            onClick={handleNavClick}
                            className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}
                        >
                            Курсы
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/services"
                            onClick={handleNavClick}
                            className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}
                        >
                            Услуги
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/championships"
                            onClick={handleNavClick}
                            className={({isActive}) => classNames(isActive ? styles.linkActive : styles.link)}
                        >
                            Чемпионаты
                        </NavLink>
                    </li>
                </ul>
                <button
                    className={classNames(styles.authButton)}
                    onClick={() => {
                        onClose();
                        navigate("/profile");
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    {user === null ? "Войти" : user.name}
                </button>
            </div>
        </>,
        containerRef.current
    );
}

export default MobileNav;
