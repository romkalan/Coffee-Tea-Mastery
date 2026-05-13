import classNames from "classnames";
import styles from "./styles.module.scss";
import {NavLink} from "react-router";
import Logo from "../Logo/Logo.tsx";
import {useContext, useState} from "react";
import ModalLogin from "../ModalLogin/ModalLogin.tsx";
import UserContext from "../../contexts/UserContext/UserContext.tsx";

function Header() {
    // const [info, setInfo] = useState("");
    const context = useContext(UserContext);

    if (!context) {
        return null;
    }

    const {user} = context;
    const [isOpen, setIsOpen] = useState(false);
    const userName = user === null ? "Войти" : user.name;

    // const writeRequest = (event: ChangeEvent<HTMLInputElement>) => {
    //     setInfo(event.target.value);
    // }

    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     event.target
    //     console.log(info + " пытаюсь найти это");
    //     console.log("Мы искали, мы искали и ничего не нашли");
    //     setInfo('');
    // }

    const handleLoginClick = () => {
        setIsOpen(true);
        console.log('Пытаюсь открыть модалку...');
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
                {/*<li>*/}
                {/*    <button>Сменить тему</button>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <form className={classNames(styles.infoForSearch)} onSubmit={handleSubmit}>*/}
                {/*        <input type="text" value={info} onChange={writeRequest} placeholder="Что ищем?"*/}
                {/*               required/>*/}
                {/*        <button type="submit">Поиск</button>*/}
                {/*    </form>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <button>Почта</button>*/}
                {/*</li>*/}
                <li>
                    <button onClick={handleLoginClick}>
                        {userName}
                    </button>
                </li>
                <li>
                    <ModalLogin isOpen={isOpen} onClose={() => setIsOpen(false)}/>
                </li>
            </ul>
        </div>
    );
}

export default Header;
