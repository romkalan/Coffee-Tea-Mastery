import type {TCourse} from "../../types/course.ts";
import type {TEnrollment} from "../../types/enrollment.ts";
import styles from "./styles.module.scss";
import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router";
import classNames from "classnames";
import ServiceRequestForm from "../../components/ServiceRequestForm/ServiceRequestForm.tsx";
import Services from "../../components/Services/Services.tsx";
import DetailCourseInfo from "../../components/DetailCourseInfo/DetailCourseInfo.tsx";
import ExpertOfCourse from "../../components/ExpertOfCourse/ExpertOfCourse.tsx";
import {useAppSelector} from "../../redux/hooks/hooks.ts";
import {selectUser} from "../../redux/entities/auth";
import {useGetEnrollmentsQuery, useCreateEnrollmentMutation} from "../../redux/entities/profile";
import ModalLogin from "../../components/ModalLogin/ModalLogin.tsx";

interface CourseDetailProps {
    courses: TCourse[];
}

function CourseDetail({courses}: CourseDetailProps){
    const params = useParams();
    const course = courses.find((course) => course.id === params.id);
    const anotherCourses = courses.sort((() => Math.random() - 0.5)).slice(0, 3);
    const user = useAppSelector(selectUser);
    const [showLogin, setShowLogin] = useState(false);

    const { data: enrollments = [] } = useGetEnrollmentsQuery(user?.id ?? "", {
        skip: !user,
    });

    const [createEnrollment] = useCreateEnrollmentMutation();

    const myEnrollment = course
        ? enrollments.find((e: TEnrollment) => e.courseId === course.id)
        : null;

    const handleEnroll = () => {
        if (!user) {
            setShowLogin(true);
            return;
        }
        if (course) {
            createEnrollment({
                userId: user.id,
                courseId: course.id,
                status: "enrolled",
                enrolledAt: new Date().toISOString(),
            });
        }
    };

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [params.id]);

    if (!course) {
        return <Navigate to="/not-found" replace />;
    }

    return (
        <div>
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
                <Services services={anotherCourses}>Другие услуги</Services>
            </div>
            <ModalLogin isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </div>
    )
}

export default CourseDetail;
