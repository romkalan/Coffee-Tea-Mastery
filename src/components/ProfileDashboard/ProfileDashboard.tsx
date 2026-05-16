import classNames from "classnames";
import styles from "./styles.module.scss";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar.tsx";
import SkillsMap from "../SkillsMap/SkillsMap.tsx";
import type { TUser } from "../../types/user.ts";
import type { TEnrollment } from "../../types/enrollment.ts";

interface ProfileDashboardProps {
    user: TUser;
    enrollments: TEnrollment[];
    onSettingsOpen: () => void;
    onComplete: (id: string, completedAt: string) => void;
}

function ProfileDashboard({ user, enrollments, onSettingsOpen, onComplete }: ProfileDashboardProps) {
    return (
        <div className={classNames(styles.layout)}>
            <ProfileSidebar
                user={user}
                enrollments={enrollments}
                onSettingsOpen={onSettingsOpen}
                onComplete={onComplete}
            />
            <div className={classNames(styles.mapArea)}>
                <SkillsMap enrollments={enrollments} />
            </div>
        </div>
    );
}

export default ProfileDashboard;
