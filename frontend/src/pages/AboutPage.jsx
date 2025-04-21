import styles from './Page.module.css';
import aboutInfo from '../assets/aboutUs.json';
import Header from '../components/Header';
import AboutUsCard from '../components/AboutUsCard';
import Footer from '../components/Footer';

export default function AboutPage() {
    return (
        <div className={styles.layout}>
            <Header />
            <h1>ABOUT US </h1>
            <p style={{margin:'0 10%'}}> We decided to make this project because it seems that every time we get hungry on campus, we always end up eating the same things because we don't know what options we have or what is affordable for us college students. 
                <br /> <br /> 
                We believe that we are not the only people that have this problem, so creating a website that compiles all nearby options and displays information about student discounts and Flames Fare acceptance would help everybody out. 
                <br /> <br /> 
                This website helps students find options around campus based on what they require from the restaurant.
                <br /> <br /> 
                This project was built for UIC students, by UIC students.
            </p>
            <br /> <br />

            <h2>CREDITS</h2>
            <section id={styles.aboutSection}>
                {aboutInfo && aboutInfo.map((item, index) => (
                    <AboutUsCard key={index} aboutBox={item}></AboutUsCard>
                ))}
            </section> 

            <p style={{fontSize: 'medium', paddingTop: '3rem'}}>This project was built for our CS 351 (Advance Data Structures) course taught by Dr. Shanon Reckinger during the Spring 2025 semester</p>

            <Footer />
        </div>
    )
}