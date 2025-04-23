import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';

export default function HomePage() {
    const [highlight, setHighlight] = useState(null);
    const [topFive, setTopFive] = useState([]);

    //BACKEND INTEGRATION: Mostly just for highlight of the week and 5 highest rated
    useEffect(() => {
        fetch("http://localhost:5000/api/highlight")
          .then(res => res.json())
          .then(data => {
            if (data && data.name) {
              setHighlight(data);
            }
          });
      
        fetch("http://localhost:5000/api/top5")
          .then(res => res.json())
          .then(data => setTopFive(data));
      }, []);


    return (
        <div className={styles.layout}>
            <Header />
            <h1> WELCOME TO UICBITES </h1>
            <h3> sharing crumbs of knowledge around UIC </h3>

            <section className={styles.explore}>
                <input type="search" id="#searchRestaurant" placeholder="Search a restaurant (within 1 mile)" /><br /><br />
                <Link className={styles.link_styles} to="/explore">
                    <h3>explore options</h3>
                </Link>
            </section>

            <h3>HIGHLIGHT OF THE WEEK!</h3>
            <Link className={styles.link_styles} id={styles.highlight} to={`/`}>
                {highlight && <RestaurantCard restaurant={highlight} />}
            </Link>

            <h3>TOP 5 HIGHEST RATED</h3>
            <div>
            {topFive.map((restaurant, index) => (
                <div key={index}>
                <RestaurantCard restaurant={restaurant} />
                </div>
            ))}
            </div>
            

            <h3> ABOUT </h3>
            <p style={{margin: '0 10%'}}> Hello! 
                <br /> We decided to create a website that compiles all of the closest food options from around UIC into one place, in order to make it easier for students and faculty alike to decide what to eat on campus! 
                <br /> Note that all distances are measured from Student Center East. 
            </p>
            <br />
            <Link className={styles.link_styles} to={`/about`}>
                <h3>about us</h3>
            </Link>

            <Footer />
        </div>
    )
}