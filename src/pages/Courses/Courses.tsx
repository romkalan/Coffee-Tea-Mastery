import classNames from "classnames";
import styles from "./styles.module.scss";
import CoursesPreview from "../../components/CoursesPreview/CoursesPreview.tsx";
import Services from "../../components/Services/Services.tsx";
import {courses} from "../../mocks/courses.ts";

function Courses() {
    return (
        <div className={classNames(styles.root)}>
            <CoursesPreview/>
            <Services services={courses} children={"Курсы"}/>
        </div>
    );
}

export default Courses;
