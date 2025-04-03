import styles from './Page.module.css';
import Header from '../components/Header';

export default function AboutPage() {
    return (
        <div className={styles.layout}>
            <Header />
            <h1> HI WELCOME TO ABOUT PAGE </h1>
            <p> add info about why we did this project </p>
            <p> how it helps uic students </p>
            <p> credits </p>
            <p> etc </p>
        </div>
    )
}