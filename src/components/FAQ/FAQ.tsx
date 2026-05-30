import {useState} from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const faqItems = [
    {
        question: "Сколько стоят услуги?",
        answer: "Стоимость зависит от объёма работ и конкретной задачи. Цены начинаются от 10 000 ₽. После консультации мы называем точную стоимость — без скрытых платежей и накруток.",
    },
    {
        question: "Как быстро вы выполняете заказы?",
        answer: "Большинство услуг занимают от 1 до 3 дней. Ремонт оборудования выполняем в день обращения при наличии запчастей. Обучение и разработка меню — от 2 дней.",
    },
    {
        question: "Вы работаете только в Москве?",
        answer: "Основная база — Москва, но мы выезжаем в регионы по договорённости. Каппинг-сессии и консультации возможны онлайн.",
    },
    {
        question: "Даёте ли вы гарантию на работу?",
        answer: "Да. На ремонт оборудования — 1 год. На обучение и разработку меню — гарантия результата: если что-то не устроит, доработаем бесплатно.",
    },
    {
        question: "Можно ли заказать разовое обучение для одного сотрудника?",
        answer: "Да, мы проводим как групповые тренинги, так и индивидуальные занятия. Программа адаптируется под текущий уровень специалиста.",
    },
];

function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={classNames(styles.root)}>
            <h2 className={classNames(styles.title)}>Часто задаваемые вопросы</h2>
            <div className={classNames(styles.list)}>
                {faqItems.map((item, index) => (
                    <div
                        key={index}
                        className={classNames(styles.item, openIndex === index && styles.itemOpen)}
                    >
                        <button
                            className={classNames(styles.question)}
                            onClick={() => toggle(index)}
                            aria-expanded={openIndex === index}
                        >
                            <span>{item.question}</span>
                            <svg
                                className={classNames(styles.arrow, openIndex === index && styles.arrowOpen)}
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        <div
                            className={classNames(styles.answer)}
                            role="region"
                            hidden={openIndex !== index}
                        >
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FAQ;
