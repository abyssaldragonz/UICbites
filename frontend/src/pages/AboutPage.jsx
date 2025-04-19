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
            <p> We decided to make this project because it seems that every time we get hungry on campus, we always end up eating the same things because we don't know what options we have or what is affordable for us college students. We believe that we are not the only people that have this problem, so creating a website that compiles all nearby options and displays information about student discounts and flames fare acceptance would help everybody out. </p>
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