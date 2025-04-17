import { Link } from 'react-router-dom';
import styles from './HeaderFooter.module.css';

import UICbitesIcon from '../assets/UICbites.svg?react';

export default function Header() {
    return (
        <div className={styles.layout}>
            <Link to="/" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <UICbitesIcon width="15rem" height="10rem" />
            </Link>

            <div className={styles.linkContainer}>
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