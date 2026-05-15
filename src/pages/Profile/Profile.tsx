import {useAppSelector, useAppDispatch} from "../../redux/hooks/hooks.ts";
import {selectUser, logout} from "../../redux/entities/auth";
import {useGetEnrollmentsQuery, useCompleteEnrollmentMutation} from "../../redux/entities/profile";
import type {TEnrollment} from "../../types/enrollment.ts";
import {courses} from "../../mocks/courses.ts";
import {useNavigate} from "react-router";
import classNames from "classnames";
import styles from "./styles.module.scss";
import SkillsMap from "../../components/SkillsMap/SkillsMap.tsx";

function Profile() {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { data: enrollments = [] } = useGetEnrollmentsQuery(user?.id ?? "", {
        skip: !user,
    });

    const [completeEnrollment] = useCompleteEnrollmentMutation();

    if (!user) {
        navigate("/");
        return null;
    }

    const getCourseTitle = (courseId: string) => {
        return courses.find(c => c.id === courseId)?.title ?? courseId;
    };

    return (
        <div className={classNames(styles.root)}>
            <div className={classNames(styles.header)}>
                <h1>Личный кабинет</h1>
                <button className={classNames(styles.logoutBtn)} onClick={() => { dispatch(logout()); navigate("/"); }}>
                    Выйти
                </button>
            </div>

            <div className={classNames(styles.layout)}>
                <aside className={classNames(styles.sidebar)}>
                    <section className={classNames(styles.infoCard)}>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </section>

                    <section className={classNames(styles.coursesCard)}>
                        <h2>Мои курсы</h2>
                        {enrollments.length === 0 && <p className={classNames(styles.emptyText)}>Вы ещё не записались ни на один курс</p>}
                        <ul className={classNames(styles.courseList)}>
                            {enrollments.map((enrollment: TEnrollment) => (
                                <li key={enrollment.id} className={classNames(styles.courseItem)}>
                                    <div className={classNames(styles.courseInfo)}>
                                        <strong>{getCourseTitle(enrollment.courseId)}</strong>
                                        <span className={classNames(styles.badge, enrollment.status === "completed" ? styles.completed : styles.enrolled)}>
                                            {enrollment.status === "completed" ? "Пройден" : "Записан"}
                                        </span>
                                    </div>
                                    {enrollment.status === "enrolled" && (
                                        <button
                                            className={classNames(styles.completeBtn)}
                                            onClick={() => completeEnrollment({
                                                id: enrollment.id,
                                                completedAt: new Date().toISOString()
                                            })}
                                        >
                                            Отметить пройденным
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                </aside>

                <main className={classNames(styles.main)}>
                    <section className={classNames(styles.mapSection)}>
                        <h2>Карта навыков</h2>
                        <SkillsMap enrollments={enrollments} />
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Profile;
