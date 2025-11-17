import type {TExpert} from "../../types/expert.ts";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface ExpertOfCourseProp {
    expert: TExpert;
}

function ExpertOfCourse({ expert }: ExpertOfCourseProp) {
    return (
        <div>
            <h1 className={classNames(styles.title)}>Преподаватель курса</h1>
            <img src={expert.photo} alt={expert.name}/>
            Курс ведет замечатльеный эксперт {expert.name}
        </div>
    )
}

export default ExpertOfCourse;
