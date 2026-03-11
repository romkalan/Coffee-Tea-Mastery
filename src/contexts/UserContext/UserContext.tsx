import { createContext } from "react";

interface UserContextType {
    user: {
        name?: string;
        email?: string;
    } | null;
    setUser: (user: any) => void;
}

const UserContext = createContext<UserContextType | null>({
    user: null,
    setUser: () => {}
});

export default UserContext;
