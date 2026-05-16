import {useState} from "react";
import {createPortal} from "react-dom";
import classNames from "classnames";
import styles from "./styles.module.scss";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/hooks.ts";
import {updateUser, selectUser, selectAuthLoading, clearError, selectAuthError} from "../../redux/entities/auth";

interface ProfileSettingsProps {
    isOpen: boolean;
    onClose: () => void;
}

function ProfileSettings({isOpen, onClose}: ProfileSettingsProps) {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectAuthLoading);
    const error = useAppSelector(selectAuthError);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name ?? "",
        email: user?.email ?? "",
        password: "",
        confirmPassword: "",
    });

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        setFieldErrors(prev => ({...prev, [name]: ""}));
        if (error) dispatch(clearError());
        setSuccess(false);
    };

    const validate = (): boolean => {
        const errors: Record<string, string> = {};
        if (!formData.name.trim()) errors.name = "Имя не может быть пустым";
        if (!formData.email.trim()) errors.email = "Email не может быть пустым";
        if (formData.password && formData.password.length < 3) errors.password = "Минимум 3 символа";
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Пароли не совпадают";
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        if (!validate() || !user) return;

        const payload = {
            id: user.id,
            name: formData.name,
            email: formData.email,
            password: formData.password || user.password,
        };

        const result = await dispatch(updateUser(payload));
        if (updateUser.fulfilled.match(result)) {
            setSuccess(true);
            setTimeout(() => onClose(), 1500);
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className={classNames(styles.overlay)} onClick={onClose}>
            <div className={classNames(styles.modal)} onClick={e => e.stopPropagation()}>
                <div className={classNames(styles.header)}>
                    <h2>Настройки профиля</h2>
                    <button className={classNames(styles.closeBtn)} onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                <div className={classNames(styles.form)}>
                    <label className={classNames(styles.label)}>Имя</label>
                    <input
                        className={classNames(styles.input, fieldErrors.name && styles.inputError)}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {fieldErrors.name && <span className={classNames(styles.fieldError)}>{fieldErrors.name}</span>}

                    <label className={classNames(styles.label)}>Email</label>
                    <input
                        className={classNames(styles.input, fieldErrors.email && styles.inputError)}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {fieldErrors.email && <span className={classNames(styles.fieldError)}>{fieldErrors.email}</span>}

                    <label className={classNames(styles.label)}>Новый пароль</label>
                    <input
                        className={classNames(styles.input, fieldErrors.password && styles.inputError)}
                        type="password"
                        name="password"
                        placeholder="Оставьте пустым, чтобы не менять"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {fieldErrors.password && <span className={classNames(styles.fieldError)}>{fieldErrors.password}</span>}

                    <label className={classNames(styles.label)}>Подтвердите пароль</label>
                    <input
                        className={classNames(styles.input, fieldErrors.confirmPassword && styles.inputError)}
                        type="password"
                        name="confirmPassword"
                        placeholder="Повторите новый пароль"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {fieldErrors.confirmPassword && <span className={classNames(styles.fieldError)}>{fieldErrors.confirmPassword}</span>}

                    {error && <p className={classNames(styles.error)}>{error}</p>}
                    {success && <p className={classNames(styles.success)}>Данные сохранены</p>}

                    <button
                        className={classNames(styles.saveBtn)}
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? "Сохранение..." : "Сохранить"}
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-container")!
    );
}

export default ProfileSettings;
