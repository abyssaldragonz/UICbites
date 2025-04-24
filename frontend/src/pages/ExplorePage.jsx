// RESOURCES
 // https://react-papaparse.js.org/docs
 // https://www.w3schools.com/react/react_useeffect.asp
 // https://stackoverflow.com/questions/26266459/retrieve-parsed-data-from-csv-in-javascript-object-using-papa-parse
 // https://stackoverflow.com/questions/46849677/how-to-extract-data-to-react-state-from-csv-file-using-papa-parse?noredirect=1&lq=1
 // https://stackoverflow.com/questions/62905933/iterating-over-results-of-papa-parse-object?rq=3
 // https://stackoverflow.com/questions/56427009/how-to-return-papa-parsed-csv-via-promise-async-await
 // https://stackoverflow.com/questions/55070466/move-results-of-papaparse-into-array
 
import { useState, useEffect } from 'react';
import styles from './Page.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';

export default function ExplorePage() {
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [sortBy, setSortBy] = useState('distance_asc');

  useEffect(() => {
    fetch("http://localhost:5000/api/data", { // react and flask use different ports so we need to specify the port for the backend
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sort_by: sortBy })
    })
      .then(res => res.json())
      .then(data => {
        setRestaurantInfo(data);
        // console.log("Fetched Data:", data);
      })
      .catch(err => console.error("API error:", err));
  }, [sortBy]); // refetch when sortBy changes

  return (
    <div className={styles.layout}>
      <Header />
      <h1>EXPLORE</h1>
      <p>Listed are the options for food options around UIC. Click the food option to view a description and directions.</p>
      <h2 style={{color: 'var(--UICred)'}}>NOTE: ALL DISTANCES ARE MEASURED FROM <span style={{textDecoration:'underline'}}>STUDENT CENTER EAST</span>
      </h2>

      <input style={{margin:'0 10%'}} type="search" id="#searchRestaurant" placeholder="Search a restaurant (within 1 mile)" /><br /><br />

      <div className={styles.sortBar}>
        <label htmlFor="sort-select">Sort By:&nbsp;</label>
        <select
            className={styles.selection}
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
        >
            <option value="distance_asc">Distance (Near → Far)</option>
            <option value="distance_desc">Distance (Far → Near)</option>
            <option value="rating_desc">Rating (High → Low)</option>
            <option value="rating_asc">Rating (Low → High)</option>
            <option value="flames_fare">FlamesFare</option>
            <option value="student_discount">Student Discounts</option>
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
