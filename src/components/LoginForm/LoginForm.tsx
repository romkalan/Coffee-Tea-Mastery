import {useContext, useState} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import * as React from "react";
import UserContext from "../../contexts/UserContext/UserContext.tsx";

interface LoginFormProps {
    onClose: () => void;
}

function LoginForm({ onClose }: LoginFormProps) {
    const context = useContext(UserContext);

    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    if (!context) {
        return null;
    }

    const { user, setUser } = context;

    const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        setFormData(prev => ({ ...prev, [name]: value })); // Используем prev для безопасности
    };

    const handleLogin = () => {
        onClose();
        setUser({
            name: formData.name,
            email: formData.email
        });
    };

    const handleLogout = () => setUser(null);

    if (user) {
        return (
            <div className={classNames(styles.userInfo)}>
                <h3>Добро пожаловать, {user.name}!</h3>
                <p>Email: {user.email}</p>
                <button
                    className={classNames(styles.logoutButton)}
                    onClick={handleLogout}
                >
                    Выйти
                </button>
            </div>
        );
    }

    return (
        <div className={classNames(styles.form)}>
            <input
                className={classNames(styles.formInput)}
                type="text"
                name="name"
                placeholder="Имя"
                value={formData.name}
                onChange={handleFieldChange}
            />
            <input
                className={classNames(styles.formInput)}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleFieldChange}
            />
            <button
                className={classNames(styles.loginButton)}
                onClick={handleLogin}
                disabled={!formData.name || !formData.email}
            >
                Войти
            </button>
        </div>
    );
}

export default LoginForm;
