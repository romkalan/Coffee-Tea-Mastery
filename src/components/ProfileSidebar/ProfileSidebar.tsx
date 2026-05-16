import classNames from "classnames";
import styles from "./styles.module.scss";
import ProfileInfoCard from "../ProfileInfoCard/ProfileInfoCard.tsx";
import ProfileCoursesCard from "../ProfileCoursesCard/ProfileCoursesCard.tsx";
import type { TUser } from "../../types/user.ts";
import type { TEnrollment } from "../../types/enrollment.ts";

interface ProfileSidebarProps {
    user: TUser;
    enrollments: TEnrollment[];
    onSettingsOpen: () => void;
    onComplete: (id: string, completedAt: string) => void;
}

function ProfileSidebar({ user, enrollments, onSettingsOpen, onComplete }: ProfileSidebarProps) {
    return (
        <aside className={classNames(styles.root)}>
            <ProfileInfoCard user={user} onSettingsOpen={onSettingsOpen} />
            <ProfileCoursesCard enrollments={enrollments} onComplete={onComplete} />
        </aside>
    );
}

export default ProfileSidebar;
