import classNames from "classnames";
import styles from "./styles.module.scss";
import type { TNew } from "../../types/new.ts";
import { formatDate } from "../../utils/utils.ts";
import { Link } from "react-router-dom";

interface DetailNewInfoProps {
    newCard: TNew;
}

function DetailNewInfo({ newCard }: DetailNewInfoProps) {
    return (
        <div className={classNames(styles.root)}>
            <div className={classNames(styles.previewInfo)}>
                <div className={classNames(styles.imageContainer)}>
                    <img
                        className={classNames(styles.previewImage)}
                        src={newCard.image}
                        alt={newCard.title}
                        loading="lazy"
                    />
                    {newCard.video && newCard.video !== "#" && (
                        <a
                            href={newCard.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classNames(styles.videoLink)}
                        >
                            <span>📹 Смотреть видео</span>
                        </a>
                    )}
                </div>
                <div className={classNames(styles.preview)}>
                    <div className={classNames(styles.meta)}>
                        <span className={classNames(styles.date)}>
                            {formatDate(newCard.date)}
                        </span>
                        <span className={classNames(styles.category)}>
                            {newCard.type}
                        </span>
                    </div>
                    <h2 className={classNames(styles.title)}>
                        {newCard.title}
                    </h2>
                    <p className={classNames(styles.excerpt)}>
                        {newCard.description}
                    </p>
                </div>
            </div>

            <div className={classNames(styles.content)}>
                <div className={classNames(styles.textContent)}>
                    <div className={classNames(styles.article)}>
                        {newCard.text.split('\n\n').map((paragraph, index) => (
                            <p key={index} className={classNames(styles.paragraph)}>
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className={classNames(styles.tags)}>
                        <span className={classNames(styles.tag)}>#кофе</span>
                        <span className={classNames(styles.tag)}>#чай</span>
                        <span className={classNames(styles.tag)}>#новости</span>
                        <span className={classNames(styles.tag)}>#образование</span>
                    </div>

                    <div className={classNames(styles.actions)}>
                        <button className={classNames(styles.shareButton)} aria-label="Поделиться">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <path d="M15 7a2.5 2.5 0 1 0-2.4-3.2L7.2 6.8a2.5 2.5 0 1 0 0 3.4l5.4 3a2.5 2.5 0 1 0 .8-1.4l-5.4-3a2.5 2.5 0 0 0 0-.8l5.4-3A2.5 2.5 0 0 0 15 7Z" fill="currentColor"/>
                            </svg>
                            Поделиться
                        </button>
                        <button className={classNames(styles.saveButton)} aria-label="Сохранить">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <path d="M5 2a1 1 0 0 0-1 1v14l6-3 6 3V3a1 1 0 0 0-1-1H5Z" fill="currentColor"/>
                            </svg>
                            Сохранить
                        </button>
                        <Link
                            to="/news"
                            className={classNames(styles.backButton)}
                        >
                            ← К списку новостей
                        </Link>
                    </div>
                </div>

                <div className={classNames(styles.sidebar)}>
                    <div className={classNames(styles.authorCard)}>
                        <h3 className={classNames(styles.authorTitle)}>Автор</h3>
                        <div className={classNames(styles.authorInfo)}>
                            <img
                                src="/images/logo.png"
                                alt="Автор"
                                className={classNames(styles.authorAvatar)}
                            />
                            <div>
                                <p className={classNames(styles.authorName)}>
                                    Команда Bee Barista
                                </p>
                                <p className={classNames(styles.authorBio)}>
                                    Эксперты в кофейной и чайной культуре
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={classNames(styles.relatedNews)}>
                        <h3 className={classNames(styles.relatedTitle)}>Читайте также</h3>
                        <div className={classNames(styles.relatedItem)}>
                            <h4>Экстракция кофе</h4>
                            <p>Основы правильного заваривания</p>
                        </div>
                        <div className={classNames(styles.relatedItem)}>
                            <h4>Дескрипторы вкуса</h4>
                            <p>Как правильно описывать вкус кофе</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailNewInfo;
