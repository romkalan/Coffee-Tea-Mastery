import type {TCourse} from "../../types/course.ts";
import styles from "./styles.module.scss";
import {useEffect} from "react";
import {useParams} from "react-router";
import classNames from "classnames";
import ServiceRequestFrom from "../../components/ServiceRequestForm/ServiceRequestForm.tsx";
import Services from "../../components/Services/Services.tsx";
import DetailCourseInfo from "../../components/DetailCourseInfo/DetailCourseInfo.tsx";
import ExpertOfCourse from "../../components/ExpertOfCourse/ExpertOfCourse.tsx";

interface CourseDetailProps {
    courses: TCourse[];
}

function CourseDetail({courses}: CourseDetailProps){
    const params = useParams();
    const course = courses.find((course) => course.id === params.id);
    const anotherCourses = courses.sort((() => Math.random() - 0.5)).slice(0, 3);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [params.id]);

    if (!course) {
        return null;
    }

    return (
        <div>
            <div className={classNames(styles.root)}>
                <DetailCourseInfo course={course}/>
                <ExpertOfCourse expert={course.expert}/>
                <ServiceRequestFrom/>
                <Services services={anotherCourses}>Другие услуги</Services>
            </div>
        </div>
    )
}

export default CourseDetail;
