import styles from './Page.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import restaurantInfo from '../assets/sampleRestaurantInfo.json';

export default function ExplorePage() {
    return (
        <div className={styles.layout}>
            <Header />
            <h1> HI WELCOME TO EXPLORE PAGE </h1>

            <p> intro </p>

            <section id={styles.exploreSection}>
                {restaurantInfo && restaurantInfo.map((item, index) => (
                    <RestaurantCard key={index} restaurant={item}></RestaurantCard>
                ))}
            </section>    

            <Footer /> 
        </div>
    )
}