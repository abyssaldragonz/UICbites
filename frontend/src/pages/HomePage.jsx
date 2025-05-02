import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';

export default function HomePage() {
    const [highlight, setHighlight] = useState(null);
    const [topFive, setTopFive] = useState([]);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // https://www.w3schools.com/jsref/event_onchange.asp
    // https://stackoverflow.com/questions/574941/how-to-track-onchange-as-you-type-in-input-type-text
    // https://medium.com/@masterrajpatel/how-to-use-onchange-event-in-reactjs-2e68ebfca8a6
    // Function to change the query input that will be passed into backend
    const handleSearchChange = (event) => {
        setQuery(event.target.value)
    };

    useEffect(() => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/autocomplete?query=${query}`);
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        };

        fetchSuggestions();
    }, [query]);


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
            <h3 style={{fontFamily: 'Fredoka', fontSize:'30px', fontStyle:'italic' }}> Sharing crumbs of knowledge around UIC </h3>

            <br />
            <p style={{fontFamily: 'Fredoka', margin: '0 15%'}}>
                <br /> We decided to create a website that compiles all of the closest food options from around UIC into one place, in order to make it easier for students and faculty alike to decide what to eat on campus! 
                <br /> Note that all distances are measured from Student Center East. 
            </p>
            

            <section className={styles.explore}>
                {/* Search Bar */}
                <div style={{left: 0, right: 0, width: '75%'}}>
                    <h2>SEARCH</h2>
                    <h3 style={{color: '#EEEEEE'}}>NOTE: ALL DISTANCES ARE MEASURED FROM <span style={{textDecoration:'underline'}}>STUDENT CENTER EAST</span></h3>
                    <input type="search" id={styles.searchRestaurant} placeholder="Search a restaurant (within 1 mile)" onChange={handleSearchChange} /><br /><br />
                </div>
                {/* Results */}
                {suggestions.map((restaurant, index) => (
                    <RestaurantCard key={index} restaurant={restaurant} />
                ))}
                <Link className={styles.link_styles} to="/explore">
                    <h3>EXPLORE OPTIONS</h3>
                </Link>
            </section>

            <h2>HIGHLIGHT OF THE WEEK!</h2>
            <div id={styles.highlight}>
                {highlight ? <RestaurantCard restaurant={highlight} /> : (<p>Loading highlight of the week...</p>)}
            </div>

            <h2>TOP 5 HIGHEST RATED</h2>
            <section id={styles.topFiveContainer}>
                {topFive ? 
                    (topFive.map((restaurant, index) => (
                        <RestaurantCard key={index} restaurant={restaurant} />
                    ))) : (<p>Loading top five...</p>)
                }
            </section>
            

            <Link className={styles.link_styles} to={`/about`}>
                <h3>ABOUT US</h3>
            </Link>

            <Footer />
        </div>
    )
}