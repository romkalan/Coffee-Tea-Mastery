import {createPortal} from "react-dom";
import classNames from "classnames";
import styles from "./styles.module.scss";
import {useEffect, useRef} from "react";

interface InfoPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

function InfoPopup({isOpen, onClose, title, content}: InfoPopupProps) {
    const popupContainerRef = useRef<Element | null>(null);

    useEffect(() => {
        popupContainerRef.current = document.getElementById('modal-container');
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !popupContainerRef.current) return null;

    return createPortal(
        <div className={classNames(styles.overlay)} onClick={onClose}>
            <div className={classNames(styles.popup)} onClick={(e) => e.stopPropagation()}>
                <h2 className={classNames(styles.title)}>{title}</h2>
                <p className={classNames(styles.content)}>{content}</p>
                <button
                    className={classNames(styles.closeButton)}
                    onClick={onClose}
                >
                    Закрыть
                </button>
            </div>
        </div>,
        popupContainerRef.current
    );
}

export default InfoPopup;