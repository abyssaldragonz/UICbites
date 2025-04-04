import styles from './Page.module.css';
import aboutInfo from '../assets/aboutUs.json';
import Header from '../components/Header';
import AboutUsCard from '../components/AboutUsCard';
import Footer from '../components/Footer';

export default function AboutPage() {
    return (
        <div className={styles.layout}>
            <Header />
            <h1> HI WELCOME TO ABOUT PAGE </h1>
            <p> add info about why we did this project </p>
            <p> how it helps uic students </p>
            <p> credits </p>
            <p> etc </p>

            <section id={styles.aboutSection}>
                {aboutInfo && aboutInfo.map((item, index) => (
                    <AboutUsCard key={index} aboutBox={item}></AboutUsCard>
                ))}
            </section> 

            <Footer />
        </div>
    )
}