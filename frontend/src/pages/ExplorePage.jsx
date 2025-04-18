import { useState, useEffect } from 'react';
import styles from './Page.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';

export default function ExplorePage() {
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [sortBy, setSortBy] = useState('rating_desc');

  useEffect(() => {
    fetch("http://localhost:5000/api/data", { // react and flask use different ports so we need to specify the port for the backend
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sort_by: sortBy })
    })
      .then(res => res.json())
      .then(data => {
        setRestaurantInfo(data);
        console.log("Fetched Data:", data);
      })
      .catch(err => console.error("API error:", err));
  }, [sortBy]); // refetch when sortBy changes

  return (
    <div className={styles.layout}>
      <Header />
      <h1>Welcome to the Explore Page</h1>

      <div className={styles.sortBar}>
        <label htmlFor="sort-select">Sort By:&nbsp;</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="rating_desc">Rating (High → Low)</option>
          <option value="rating_asc">Rating (Low → High)</option>
          <option value="distance_asc">Distance (Near → Far)</option>
          <option value="distance_desc">Distance (Far → Near)</option>
        </select>
      </div>

      <section id={styles.exploreSection}>
        {restaurantInfo.length > 0 ? (
          restaurantInfo.map((item, index) => (
            <RestaurantCard key={index} restaurant={item} />
          ))
        ) : (
          <p>Loading restaurant data...</p>
        )}
      </section>

      <Footer />
    </div>
  );
}
