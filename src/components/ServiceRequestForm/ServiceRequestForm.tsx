import classNames from "classnames";
import styles from "./styles.module.scss";
import {type ChangeEvent, type FormEvent, useState} from "react";

interface FormState {
    name: string;
    phone: string;
    email: string;
    message: string;
}

function ServiceRequestFrom() {
    const [formData, setFormData] = useState<FormState>({
        name: "",
        phone: "",
        email: "",
        message: "",
    })

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const clearForm = () => {
        setFormData({name: "", phone: "", email: "", message: ""})
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.target
        console.log("Данные формы: ", formData);
        console.log("Спасибо за ваше обращение. Мы скоро с Вами свяжемся");
        clearForm();
    }

    return (
        <div>
            <h2 className={classNames(styles.subtitle)}>Оставить заявку</h2>
            <div className={classNames(styles.root)}>
                <div className={classNames(styles.card)}>
                    <h3 className={classNames(styles.cardTitle)}>Заполните форму и с Вами свяжеться наш сотрудник, чтобы
                        обговрить все детали и ответить на все
                        Ваши вопросы</h3>
                    <p className={classNames(styles.cardText)}>* Помните, что наша команда в праве отказать в выполнении услуги, если это противоречит политике нашего сообщества</p>
                </div>
                <form className={classNames(styles.form)} onSubmit={handleSubmit}>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                           placeholder="Роман"
                           required/>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                           placeholder="+7 (9**) ***-**-**" required/>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                           placeholder="email@domen.ru" required/>
                    <textarea value={formData.message} name="message" onChange={handleInputChange}
                              placeholder="Ваше сообщение"/>
                    <button type="submit">Отправить заявку</button>
                </form>
            </div>
        </div>
    );
}

export default ServiceRequestFrom;
