import classNames from "classnames";
import styles from "./styles.module.scss";
import {NavLink} from "react-router";
import Logo from "../Logo/Logo.tsx";
import FeedbackForm from "../FeedbackForm/FeedbackForm.tsx";

function Footer() {

    return (
        <div className={classNames(styles.root)}>
            <ul className={classNames(styles.contacts)}>
                <Logo/>
                <li>
                    <svg width="25" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M12.4286 10.859C12.4286 9.13244 11.1228 7.7334 9.51135 7.7334C7.90105 7.7334 6.59528 9.13244 6.59528 10.859C6.59528 12.5844 7.90105 13.9834 9.51135 13.9834C11.1228 13.9834 12.4286 12.5844 12.4286 10.859Z"
                              stroke="#D2691E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M9.49943 23.7207C6.1184 23.7207 0.75 17.419 0.75 10.719C0.75 5.47378 4.66662 1.2207 9.49943 1.2207C14.3322 1.2207 18.25 5.47378 18.25 10.719C18.25 17.419 12.8816 23.7207 9.49943 23.7207Z"
                              stroke="#D2691E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>125993, г. Москва, ул. 6-я Радиальная, д. 10</span>
                </li>
                <li>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.969 8.74463C18.969 8.74463 15.2239 13.5604 12.4847 13.5604C9.74673 13.5604 5.95959 8.74463 5.95959 8.74463"
                            stroke="#D2691E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M1.36072 12.4316C1.36072 3.88402 4.1385 1.03564 12.4718 1.03564C20.8052 1.03564 23.5829 3.88402 23.5829 12.4316C23.5829 20.978 20.8052 23.8276 12.4718 23.8276C4.1385 23.8276 1.36072 20.978 1.36072 12.4316Z"
                              stroke="#D2691E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>bee-barista@gmail.com</span>
                </li>
                <li>
                    <svg width="25" height="25" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.2446 0.908203C19.5625 1.42195 22.9738 5.07195 23.4591 9.6982" stroke="#D2691E"
                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.2446 5.33691C17.3108 5.76691 18.9255 7.49816 19.328 9.71191" stroke="#D2691E"
                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M7.48394 17.8445C-0.563705 9.22098 0.580651 5.27214 1.42901 3.99965C1.538 3.79398 4.22426 -0.514447 7.10373 2.01329C14.251 8.32002 5.20266 7.42835 11.2043 13.8598C17.2073 20.2899 16.3738 10.5956 22.2603 18.2518C24.6196 21.3382 20.5982 24.2162 20.4075 24.3317C19.2198 25.2419 15.5328 26.468 7.48394 17.8445Z"
                              stroke="#D2691E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>+7 (925) 451-11-72</span>
                </li>
            </ul>
            <div className={classNames(styles.additionalInfo)}>
                <nav className={classNames(styles.footerPages)}>
                    <h4 className={classNames(styles.socialsTitle)}>Навигация по сайту</h4>
                    <NavLink to={"/"}>Главная</NavLink>
                    <NavLink to={"/news"}>Новости</NavLink>
                    <NavLink to={"/courses"}>Курсы</NavLink>
                    <NavLink to={"/championships"}>Чемпионаты</NavLink>
                </nav>
                <nav className={classNames(styles.footerPages)}>
                    <h4 className={classNames(styles.socialsTitle)}>Помощь</h4>
                    <NavLink to={"/courses"}>Как записаться на курсы?</NavLink>
                    <NavLink to={"#"}>Как стать экспертом?</NavLink>
                    <NavLink to={"/championships"}>Как принять участвовать в чемпионате?</NavLink>
                    <NavLink to={"#"}></NavLink>
                </nav>
                <div className={classNames(styles.socials)}>
                <h4 className={classNames(styles.socialsTitle)}>Мы в социальных сетях</h4>
                    <ul className={classNames(styles.socialsList)}>
                        <li>
                            <a href="#">
                                <img className={classNames(styles.link)}
                                     src="/images/vkIcon.png"
                                     alt="Ссылка на сообщество в ВК"/>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img className={classNames(styles.link)}
                                     src="/images/instIcon.png"
                                     alt="Ссылка на сообщество в Инстаграм"/>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img className={classNames(styles.link)}
                                     src="/images/TGIcon.png"
                                     alt="Ссылка на сообщество в Телеграмм"/>
                            </a>
                        </li>
                    </ul>
                </div>
                <FeedbackForm />
            </div>
            <p className={classNames(styles.rights)}>© 2025 Bee Barista. All Rights Reserved</p>
        </div>
    );
}

export default Footer;
