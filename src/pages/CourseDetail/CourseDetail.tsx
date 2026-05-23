import styles from "./styles.module.scss";
import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router";
import classNames from "classnames";
import ServiceRequestForm from "../../components/ServiceRequestForm/ServiceRequestForm.tsx";
import Services from "../../components/Services/Services.tsx";
import DetailCourseInfo from "../../components/DetailCourseInfo/DetailCourseInfo.tsx";
import ExpertOfCourse from "../../components/ExpertOfCourse/ExpertOfCourse.tsx";
import {useAppSelector, useAppDispatch} from "../../redux/hooks/hooks.ts";
import {selectUser, enrollCourse} from "../../redux/entities/auth";
import ModalLogin from "../../components/ModalLogin/ModalLogin.tsx";
import {useGetCourseByIdQuery, useGetCoursesQuery} from "../../redux/services/api.ts";
import Skeleton from "../../components/Skeleton/Skeleton.tsx";
import ErrorState from "../../components/ErrorState/ErrorState.tsx";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs.tsx";

function CourseDetail(){
    const params = useParams();
    const {data: course, isLoading, error, refetch} = useGetCourseByIdQuery(params.id!);
    const {data: allCourses} = useGetCoursesQuery();
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const [showLogin, setShowLogin] = useState(false);

    const myEnrollment = user && course
        ? (user.courses || []).find(c => c.courseId === course.id)
        : null;

    const handleEnroll = () => {
        if (!user) {
            setShowLogin(true);
            return;
        }
        if (course) {
            dispatch(enrollCourse({ courseId: course.id }));
        }
    };

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [params.id]);

    if (isLoading) return <Skeleton variant="card" count={3} />;
    if (error) return <ErrorState onRetry={refetch} />;
    if (!course) return <Navigate to="/not-found" replace />;

    const otherCourses = allCourses
        ? [...allCourses].sort(() => Math.random() - 0.5).slice(0, 3)
        : [];

    return (
        <div>
            <Breadcrumbs crumbs={[
                { label: "Главная", href: "/" },
                { label: "Курсы", href: "/courses" },
                { label: course.title },
            ]} />
            <div className={classNames(styles.root)}>
                <DetailCourseInfo course={course}/>
                <ExpertOfCourse expertId={course.expertId}/>

                <div className={classNames(styles.enrollSection)}>
                    {myEnrollment ? (
                        <p className={classNames(styles.enrolledText)}>
                            {myEnrollment.status === "completed"
                                ? "Курс пройден"
                                : "Вы записаны на этот курс"}
                        </p>
                    ) : (
                        <button
                            className={classNames(styles.enrollButton)}
                            onClick={handleEnroll}
                        >
                            {user ? "Записаться на курс" : "Войдите, чтобы записаться"}
                        </button>
                    )}
                </div>

                <ServiceRequestForm/>
                {otherCourses.length > 0 && (
                    <Services services={otherCourses}>Другие курсы</Services>
                )}
            </div>
            <ModalLogin isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </div>
    )
}

export default CourseDetail;
