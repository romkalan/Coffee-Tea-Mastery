import {useState, useEffect, useRef} from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const steps = [
    {
        title: "Заявка",
        description: "Вы оставляете заявку на сайте или связываетесь с нами любым удобным способом",
    },
    {
        title: "Консультация",
        description: "Мы обсуждаем вашу задачу, сроки и стоимость. Отвечаем на все вопросы",
    },
    {
        title: "Выполнение",
        description: "Проводим диагностику, обучение или разрабатываем решение под вашу задачу",
    },
    {
        title: "Результат",
        description: "Вы получаете готовый результат с гарантией и поддержкой после выполнения",
    },
];

function ServiceProcess() {
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
            <h2 className={classNames(styles.title)}>Как мы работаем</h2>
            <div className={classNames(styles.steps, isAnimated && styles.animate)}>
                {steps.map((step, index) => (
                    <div key={step.title} className={classNames(styles.step)}>
                        <div className={classNames(styles.stepNumber)}>{index + 1}</div>
                        <div className={classNames(styles.stepContent)}>
                            <h3 className={classNames(styles.stepTitle)}>{step.title}</h3>
                            <p className={classNames(styles.stepDescription)}>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServiceProcess;
