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
                        <button className={classNames(styles.shareButton)}>
                            📤 Поделиться
                        </button>
                        <button className={classNames(styles.saveButton)}>
                            💾 Сохранить
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
