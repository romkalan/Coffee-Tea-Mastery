import classNames from "classnames";
import styles from "./styles.module.scss";
import ProfileInfoCard from "../ProfileInfoCard/ProfileInfoCard.tsx";
import ProfileCoursesCard from "../ProfileCoursesCard/ProfileCoursesCard.tsx";
import type { TUser } from "../../types/user.ts";

interface ProfileSidebarProps {
    user: TUser;
    onSettingsOpen: () => void;
    onComplete: (courseId: string, completedAt: string) => void;
}

function ProfileSidebar({ user, onSettingsOpen, onComplete }: ProfileSidebarProps) {
    return (
        <aside className={classNames(styles.root)}>
            <ProfileInfoCard user={user} onSettingsOpen={onSettingsOpen} />
            <ProfileCoursesCard courses={user.courses} onComplete={onComplete} />
        </aside>
    );
}

export default ProfileSidebar;
