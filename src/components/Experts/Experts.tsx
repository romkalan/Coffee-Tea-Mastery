import classNames from "classnames";
import styles from "./styles.module.scss";
import Expert from "../Expert/Expert.tsx";
import {experts} from "../../mocks/experts.ts";

function Experts() {
    return (
        <div className={classNames(styles.root)}>
            <h2 className={classNames(styles.title)}>Наша команда экспертов</h2>
            <ul className={classNames(styles.expertsList)}>
                {experts.map((expert) =>
                    <li key={expert.id}>
                        <Expert expert={expert} />
                    </li>)}
            </ul>
        </div>
    );
}

export default Experts;
