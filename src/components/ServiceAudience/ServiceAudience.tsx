import {useState, useEffect, useRef} from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const audienceItems = [
    {
        id: "coffee-shop",
        title: "Кофейни",
        description: "Повышение качества напитков, ремонт оборудования и разработка уникального меню",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="8" fill="#4D0505"/>
                <path d="M34 20H14C13.45 20 13 20.45 13 21V28C13 31.87 16.13 35 20 35H28C31.87 35 35 31.87 35 28V21C35 20.45 34.55 20 34 20ZM32 28C32 30.21 30.21 32 28 32H20C17.79 32 16 30.21 16 28V23H32V28Z" fill="#F0E6D2"/>
                <rect x="15" y="15" width="18" height="2" rx="1" fill="#F0E6D2"/>
                <path d="M20 36H28V38H20V36Z" fill="#F0E6D2"/>
            </svg>
        ),
    },
    {
        id: "restaurant",
        title: "Рестораны",
        description: "Кофейная карта ресторанного уровня, обучение персонала и подбор оборудования",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="8" fill="#4D0505"/>
                <circle cx="24" cy="19" r="5" stroke="#F0E6D2" strokeWidth="2" fill="none"/>
                <path d="M18 28C18 25 20 24 24 24C28 24 30 25 30 28V36H18V28Z" stroke="#F0E6D2" strokeWidth="2" fill="none"/>
                <path d="M14 36H34" stroke="#F0E6D2" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        ),
    },
    {
        id: "hotel",
        title: "Отели",
        description: "Сервис для завтраков, обучение сотрудников службы питания и разработка чайной карты",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="8" fill="#4D0505"/>
                <path d="M34 18H14V32H34V18Z" stroke="#F0E6D2" strokeWidth="2" fill="none"/>
                <path d="M10 34H38V36H10V34Z" fill="#F0E6D2"/>
                <path d="M18 18V14H30V18" stroke="#F0E6D2" strokeWidth="2" fill="none"/>
                <path d="M22 26H26V32H22V26Z" fill="#F0E6D2"/>
                <line x1="14" y1="22" x2="18" y2="22" stroke="#F0E6D2" strokeWidth="1.5"/>
                <line x1="14" y1="24" x2="18" y2="24" stroke="#F0E6D2" strokeWidth="1.5"/>
            </svg>
        ),
    },
    {
        id: "production",
        title: "Производство",
        description: "Контроль качества продукции, каппинг-тестирование партий и консультации по обжарке",
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="8" fill="#4D0505"/>
                <circle cx="24" cy="24" r="10" stroke="#F0E6D2" strokeWidth="2" fill="none"/>
                <path d="M24 18V24L28 28" stroke="#F0E6D2" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="24" cy="24" r="2" fill="#F0E6D2"/>
            </svg>
        ),
    },
];

function ServiceAudience() {
    const [isAnimated, setIsAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsAnimated(true);
                    observer.disconnect();
                }
            },
            {threshold: 0.1}
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={classNames(styles.root)}>
            <h2 className={classNames(styles.title)}>Кому подходят наши услуги</h2>
            <div className={classNames(styles.grid, isAnimated && styles.animate)}>
                {audienceItems.map((item) => (
                    <div key={item.id} className={classNames(styles.card)}>
                        <div className={classNames(styles.icon)}>{item.icon}</div>
                        <h3 className={classNames(styles.cardTitle)}>{item.title}</h3>
                        <p className={classNames(styles.cardDescription)}>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServiceAudience;
