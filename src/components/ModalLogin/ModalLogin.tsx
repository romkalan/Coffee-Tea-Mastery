import {createPortal} from "react-dom";
import classNames from "classnames";
import styles from "./styles.module.scss";
import {useEffect, useRef} from "react";
import LoginForm from "../LoginForm/LoginForm.tsx";

interface ModalLoginProps {
    isOpen: boolean;
    onClose: () => void;
}

function ModalLogin({isOpen, onClose}: ModalLoginProps) {
    const modalContainerRef = useRef<Element | null>(null);

    useEffect(() => {
        modalContainerRef.current = document.getElementById('modal-container');
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Блокируем скролл
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset'; // Возвращаем скролл
        };
    }, [isOpen, onClose]);


    if (!isOpen || !modalContainerRef.current) return null;

    console.log("Модалка открыта");

    return createPortal(
        <div className={classNames(styles.overlay)} onClick={onClose}>
            <div className={classNames(styles.modal)} onClick={(e) => e.stopPropagation()}>
                <h2>Окно авторизации</h2>
                <LoginForm onClose={onClose}/>
                <button
                    className={classNames(styles.closeButton)}
                    onClick={onClose}
                >
                    Закрыть
                </button>
            </div>
        </div>,
        modalContainerRef.current
    );
}

export default ModalLogin;
