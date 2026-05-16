import {useAppSelector, useAppDispatch} from "../../redux/hooks/hooks.ts";
import {selectUser, logout} from "../../redux/entities/auth";
import {useGetEnrollmentsQuery, useCompleteEnrollmentMutation} from "../../redux/entities/profile";
import {Navigate, useNavigate} from "react-router";
import {useState} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader.tsx";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar.tsx";
import SkillsMap from "../../components/SkillsMap/SkillsMap.tsx";
import ProfileSettings from "../../components/ProfileSettings/ProfileSettings.tsx";

function Profile() {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [settingsOpen, setSettingsOpen] = useState(false);

    const { data: enrollments = [] } = useGetEnrollmentsQuery(user?.id ?? "", {
        skip: !user,
    });

    const [completeEnrollment] = useCompleteEnrollmentMutation();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className={classNames(styles.root)}>
            <ProfileHeader onLogout={() => { dispatch(logout()); navigate("/"); }} />

            <div className={classNames(styles.layout)}>
                <ProfileSidebar
                    user={user}
                    enrollments={enrollments}
                    onSettingsOpen={() => setSettingsOpen(true)}
                    onComplete={(id, completedAt) => completeEnrollment({ id, completedAt })}
                />
                <div className={classNames(styles.mapArea)}>
                    <SkillsMap enrollments={enrollments} />
                </div>
            </div>

            <ProfileSettings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </div>
    );
}

export default Profile;
