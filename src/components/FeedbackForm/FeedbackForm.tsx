import classNames from "classnames";
import styles from "./styles.module.scss";
import {type ChangeEvent, type FormEvent, useState} from "react";

function FeedbackForm() {
    const [phone, setPhone] = useState("");

    const writePhone = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPhone('');
    }

    return (
        <div className={classNames(styles.feedback)}>
            <h4 className={classNames(styles.feedbackTitle)}>Остались вопросы?</h4>
            <form className={classNames(styles.feedbackAddress)} onSubmit={handleSubmit}>
                <input type="tel" value={phone} onChange={writePhone} placeholder="+7 (9**) ***-**-**" required/>
                <button type="submit">Позвонить</button>
            </form>
            <p className={classNames(styles.feedbackText)}>
                Оставьте свой номер телефона, и мы обязательно свяжемся с Вами!
            </p>
        </div>
    );
}

export default FeedbackForm;
