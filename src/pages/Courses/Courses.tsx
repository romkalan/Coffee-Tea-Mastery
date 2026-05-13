import classNames from "classnames";
import styles from "./styles.module.scss";
import CoursesPreview from "../../components/CoursesPreview/CoursesPreview.tsx";
import Services from "../../components/Services/Services.tsx";
import {courses} from "../../mocks/courses.ts";
import {FormatsForDetailInfo} from "../../utils/helpers.ts";
import Experts from "../../components/Experts/Experts.tsx";
import {useEffect} from "react";
import {useSearchParams} from "react-router";

function Courses() {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const section = searchParams.get("section");
        if (section === "training-center") {
            const element = document.getElementById("training-center");
            if (element) {
                element.scrollIntoView({behavior: "smooth"});
            }
        }
    }, [searchParams]);

    return (
        <div className={classNames(styles.root)}>
            <CoursesPreview/>
            <Experts />
            <div id="training-center">
                <Services services={courses.filter((course) => course.format === FormatsForDetailInfo.offline)} children={"Ближайшие занятия в тренинг-центре"}/>
            </div>
            <Services services={courses.filter((course) => course.format === FormatsForDetailInfo.online)} children={"Ближайшие занятия в онлайн-школе"}/>
        </div>
    );
}

export default Courses;
