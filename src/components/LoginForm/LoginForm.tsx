import {useState} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/hooks.ts";
import {
    loginUser,
    registerUser,
    clearError,
    selectAuthLoading,
    selectAuthError
} from "../../redux/entities/auth";

interface LoginFormProps {
    onClose: () => void;
}

function LoginForm({ onClose }: LoginFormProps) {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectAuthLoading);
    const error = useAppSelector(selectAuthError);

    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) dispatch(clearError());
    };

    const handleSubmit = async () => {
        if (isRegister) {
            const result = await dispatch(registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            }));
            if (registerUser.fulfilled.match(result)) {
                onClose();
            }
        } else {
            const result = await dispatch(loginUser({
                email: formData.email,
                password: formData.password,
            }));
            if (loginUser.fulfilled.match(result)) {
                onClose();
            }
        }
    };

    return (
        <div className={classNames(styles.form)}>
            <div className={classNames(styles.tabs)}>
                <button
                    className={classNames(styles.tab, !isRegister && styles.tabActive)}
                    onClick={() => { setIsRegister(false); dispatch(clearError()); }}
                >
                    Вход
                </button>
                <button
                    className={classNames(styles.tab, isRegister && styles.tabActive)}
                    onClick={() => { setIsRegister(true); dispatch(clearError()); }}
                >
                    Регистрация
                </button>
            </div>

            {isRegister && (
                <input
                    className={classNames(styles.formInput)}
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleFieldChange}
                />
            )}
            <input
                className={classNames(styles.formInput)}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleFieldChange}
            />
            <input
                className={classNames(styles.formInput)}
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleFieldChange}
            />

            {error && <p className={classNames(styles.error)}>{error}</p>}

            <button
                className={classNames(styles.loginButton)}
                onClick={handleSubmit}
                disabled={loading || !formData.email || !formData.password || (isRegister && !formData.name)}
            >
                {loading ? "Загрузка..." : (isRegister ? "Зарегистрироваться" : "Войти")}
            </button>
        </div>
    );
}

export default LoginForm;
