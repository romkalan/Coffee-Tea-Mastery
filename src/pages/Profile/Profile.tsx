import {useAppSelector, useAppDispatch} from "../../redux/hooks/hooks.ts";
import {selectUser, logout, completeCourse} from "../../redux/entities/auth";
import {Navigate, useNavigate} from "react-router";
import {useState} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader.tsx";
import ProfileDashboard from "../../components/ProfileDashboard/ProfileDashboard.tsx";
import ProfileSettings from "../../components/ProfileSettings/ProfileSettings.tsx";

function Profile() {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [settingsOpen, setSettingsOpen] = useState(false);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className={classNames(styles.root)}>
            <ProfileHeader onLogout={() => { dispatch(logout()); navigate("/"); }} />
            <ProfileDashboard
                user={user}
                onSettingsOpen={() => setSettingsOpen(true)}
                onComplete={(courseId, completedAt) => dispatch(completeCourse({ courseId, completedAt }))}
                onTerritoryClick={(territoryId) => navigate(`/courses?skillArea=${territoryId}`)}
            />
            <ProfileSettings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </div>
    );
}

export default Profile;
