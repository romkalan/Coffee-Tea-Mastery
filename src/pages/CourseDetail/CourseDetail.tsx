import styles from "./styles.module.scss";
import {useEffect} from "react";
import {Navigate, useParams} from "react-router";
import classNames from "classnames";
import ServiceRequestForm from "../../components/ServiceRequestForm/ServiceRequestForm.tsx";
import Services from "../../components/Services/Services.tsx";
import DetailCourseInfo from "../../components/DetailCourseInfo/DetailCourseInfo.tsx";
import ExpertOfCourse from "../../components/ExpertOfCourse/ExpertOfCourse.tsx";
import {useGetCourseByIdQuery, useGetCoursesQuery} from "../../redux/services/api.ts";
import Skeleton from "../../components/Skeleton/Skeleton.tsx";
import ErrorState from "../../components/ErrorState/ErrorState.tsx";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs.tsx";

function CourseDetail(){
    const params = useParams();
    const {data: course, isLoading, error, refetch} = useGetCourseByIdQuery(params.id!);
    const {data: allCourses} = useGetCoursesQuery();

    const scrollToForm = () => {
        const form = document.getElementById("request-form");
        if (form) {
            form.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (course) {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
    }, [params.id, course]);

    if (isLoading) return <Skeleton variant="card" count={3} />;
    if (error) return <ErrorState onRetry={refetch} />;
    if (!course) return <Navigate to="/not-found" replace />;

    const otherCourses = allCourses
        ? [...allCourses].sort(() => Math.random() - 0.5).slice(0, 3)
        : [];

    return (
        <div className="page">
            <Breadcrumbs crumbs={[
                { label: "Главная", href: "/" },
                { label: "Курсы", href: "/courses" },
                { label: course.title },
            ]} />
            <div className={classNames(styles.root)}>
                <DetailCourseInfo course={course} onRequestClick={scrollToForm}/>
                <ExpertOfCourse expertId={course.expertId}/>

                <div className={classNames(styles.enrollSection)}>
                    <button
                        className={classNames(styles.enrollButton)}
                        onClick={scrollToForm}
                    >
                        Оставить заявку
                    </button>
                </div>

                <ServiceRequestForm/>
                {otherCourses.length > 0 && (
                    <Services services={otherCourses}>Другие курсы</Services>
                )}
            </div>
        </div>
    )
}

export default CourseDetail;
