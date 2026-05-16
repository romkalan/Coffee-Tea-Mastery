import {useAppSelector, useAppDispatch} from "../../redux/hooks/hooks.ts";
import {selectUser, logout} from "../../redux/entities/auth";
import {useGetEnrollmentsQuery, useCompleteEnrollmentMutation} from "../../redux/entities/profile";
import type {TEnrollment} from "../../types/enrollment.ts";
import {courses} from "../../mocks/courses.ts";
import {Navigate, useNavigate} from "react-router";
import {useState} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import SkillsMap from "../../components/SkillsMap/SkillsMap.tsx";
import ProfileSettings from "../../components/ProfileSettings/ProfileSettings.tsx";

function Profile() {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [filter, setFilter] = useState<"enrolled" | "completed">("enrolled");

    const { data: enrollments = [] } = useGetEnrollmentsQuery(user?.id ?? "", {
        skip: !user,
    });

    const [completeEnrollment] = useCompleteEnrollmentMutation();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    const getCourseTitle = (courseId: string) => {
        return courses.find(c => c.id === courseId)?.title ?? courseId;
    };

    const filteredEnrollments = enrollments.filter(
        (e: TEnrollment) => e.status === filter
    );

    const hasAnyEnrolled = enrollments.some((e: TEnrollment) => e.status === "enrolled");
    const hasAnyCompleted = enrollments.some((e: TEnrollment) => e.status === "completed");

    return (
        <div className={classNames(styles.root)}>
            <div className={classNames(styles.header)}>
                <h1>Личный кабинет</h1>
                <button className={classNames(styles.logoutBtn)} onClick={() => { dispatch(logout()); navigate("/"); }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Выйти
                </button>
            </div>

            <div className={classNames(styles.layout)}>
                <aside className={classNames(styles.sidebar)}>
                    <section className={classNames(styles.infoCard)}>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <button className={classNames(styles.settingsBtn)} onClick={() => setSettingsOpen(true)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                            </svg>
                            Настройки
                        </button>
                    </section>

                    <section className={classNames(styles.coursesCard)}>
                        <h2>Мои курсы</h2>
                        <div className={classNames(styles.toggle)}>
                            <button
                                className={classNames(styles.toggleBtn, filter === "enrolled" && styles.toggleActive)}
                                onClick={() => setFilter("enrolled")}
                            >
                                Текущие
                            </button>
                            <button
                                className={classNames(styles.toggleBtn, filter === "completed" && styles.toggleActive)}
                                onClick={() => setFilter("completed")}
                            >
                                Пройденные
                            </button>
                        </div>
                        {enrollments.length === 0 && filter === "enrolled" && (
                            <p className={classNames(styles.emptyText)}>Вы ещё не записались ни на один курс</p>
                        )}
                        {enrollments.length === 0 && filter === "completed" && (
                            <p className={classNames(styles.emptyText)}>Вы ещё не прошли ни одного курса</p>
                        )}
                        {enrollments.length > 0 && filteredEnrollments.length === 0 && filter === "completed" && !hasAnyCompleted && (
                            <p className={classNames(styles.emptyText)}>Нет пройденных курсов. Продолжайте обучение!</p>
                        )}
                        {enrollments.length > 0 && filteredEnrollments.length === 0 && filter === "enrolled" && !hasAnyEnrolled && (
                            <div className={classNames(styles.emptyBlock)}>
                                <p className={classNames(styles.emptyText)}>Вы сейчас не проходите ни один из курсов. Запишитесь на новый, чтобы продолжить развитие.</p>
                                <button className={classNames(styles.toCoursesBtn)} onClick={() => navigate("/courses")}>
                                    Выбрать курс
                                </button>
                            </div>
                        )}
                        {filteredEnrollments.length > 0 && (
                            <ul className={classNames(styles.courseList)}>
                                {filteredEnrollments.map((enrollment: TEnrollment) => (
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
                                                onClick={() => {
                                                    completeEnrollment({
                                                        id: enrollment.id,
                                                        completedAt: new Date().toISOString()
                                                    });
                                                }}
                                            >
                                                Отметить пройденным
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </aside>

                <main className={classNames(styles.main)}>
                    <section className={classNames(styles.mapSection)}>
                        <h2>Моя карта навыков</h2>
                        <SkillsMap enrollments={enrollments} />
                    </section>
                </main>
            </div>
            <ProfileSettings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </div>
    );
}

export default Profile;
