import classNames from "classnames";
import styles from "./styles.module.scss";
import {useEffect, useRef} from "react";

interface TooltipProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

function Tooltip({isOpen, onClose, title, content}: TooltipProps) {
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: Event) => {
            if (isOpen && tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={classNames(styles.tooltip)} ref={tooltipRef}>
            <h4 className={classNames(styles.title)}>{title}</h4>
            <p className={classNames(styles.content)}>{content}</p>
        </div>
    );
}

export default Tooltip;