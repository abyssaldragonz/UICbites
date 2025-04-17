import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
    return (
        <div className={styles.layout}>
            <Header />
            <h2> HI WELCOME TO HOME PAGE </h2>
            <h2> ADD A NAME HERE </h2>

            <section className={styles.explore}>
                <input type="search" id="#searchRestaurant" placeholder="Search a restaurant (within 1 mile)" /><br /><br />
                <Link className={styles.link_styles} to="/explore">
                    <h3>explore options</h3>
                </Link>
            </section>

            <h3>HIGHLIGHT OF THE WEEK!</h3>
            <Link className={styles.link_styles} id={styles.highlight} to={`/`}>
                <h3>highlight of the week</h3>
            </Link>

            <h3> ABOUT </h3>
            <p> some about us paragraph </p>

            <Footer />
        </div>
    )
}