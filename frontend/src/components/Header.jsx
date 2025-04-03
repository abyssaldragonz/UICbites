import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    return (
        <div className={styles.layout}>
            <h1> HOME </h1>
            <div className={styles.linkContainer}>
                <Link className={styles.link_styles} to="/">
                    <h3>BUTTON</h3>
                </Link>

                <Link className={styles.link_styles} to="/explore">
                    <h3>EXPLORE</h3>
                </Link>

                <Link className={styles.link_styles} to="/about">
                    <h3>ABOUT</h3>
                </Link>
            </div>
        </div>
    )
}