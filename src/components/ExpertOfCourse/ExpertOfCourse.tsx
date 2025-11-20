// import type {TExpert} from "../../types/expert.ts";
import classNames from "classnames";
import styles from "./styles.module.scss";
import {findElementById} from "../../utils/utils.ts";
import {experts} from "../../mocks/experts.ts";

interface ExpertOfCourseProp {
    expertId: string;
}

function ExpertOfCourse({expertId}: ExpertOfCourseProp) {
    const expert = findElementById(experts, expertId);

    if (!expert) {
        return <h2 className={classNames(styles.title)}>На этот курс еще не назначен эксперт</h2>
    }

    return (
        <div>
            <h2 className={classNames(styles.title)}>Эксперт курса</h2>
            <div className={classNames(styles.root)}>
                <div className={classNames(styles.content)}>
                    <div className={classNames(styles.imageContainer)}>
                        <img
                            src={expert.photo || "/images/expert-placeholder.png"}
                            alt={expert.name}
                            className={classNames(styles.image)}
                        />
                    </div>
                    <div className={classNames(styles.info)}>
                        <h3 className={classNames(styles.name)}>{expert.name}</h3>
                        <p className={classNames(styles.position)}>{expert.position}</p>

                        <div className={classNames(styles.expertise)}>
                            <h4 className={classNames(styles.expertiseTitle)}>Опыт и экспертиза:</h4>
                            <ul className={classNames(styles.expertiseList)}>
                                {expert.expertise.map((item, index) => (
                                    <li key={index} className={classNames(styles.expertiseItem)}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {expert.achievements && (
                            <div className={classNames(styles.achievements)}>
                                <h4 className={classNames(styles.achievementsTitle)}>Достижения:</h4>
                                <p className={classNames(styles.achievementsText)}>{expert.achievements}</p>
                            </div>
                        )}
                        <div className={classNames(styles.contact)}>
                            <p className={classNames(styles.contactText)}>
                                {expert.contactInfo || "Связаться с экспертом можно через форму заявки"}
                                <button className={classNames(styles.button)}>Перейти к форме</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpertOfCourse;
