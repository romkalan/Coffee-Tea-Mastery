import classNames from "classnames";
import styles from "./styles.module.scss";
import CoursesPreview from "../../components/CoursesPreview/CoursesPreview.tsx";
import Services from "../../components/Services/Services.tsx";
import {courses} from "../../mocks/courses.ts";
import {FormatsForDetailInfo} from "../../utils/helpers.ts";
import Experts from "../../components/Experts/Experts.tsx";

function Courses() {
    return (
        <div className={classNames(styles.root)}>
            <CoursesPreview/>
            <Experts />
            <Services services={courses.filter((course) => course.format === FormatsForDetailInfo.offline)} children={"Ближайшие занятия в тренинг-центре"}/>
            <Services services={courses.filter((course) => course.format === FormatsForDetailInfo.online)} children={"Ближайшие занятия в онлайн-школе"}/>
        </div>
    );
}

export default Courses;
