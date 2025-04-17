import React, { useState } from 'react';
import styles from './RestaurantCard.module.css';

import flamesFareFile from '../../../backend/flamesFare.csv?raw';
import studentDiscountFile from '../../../backend/studentDiscount.csv?raw';
// import getTodaysHours from '../../../backend/dataStorage.py';

import Star from '../assets/star.svg?react';

// flamesFare button component
function FlamesFare({restaurant}) {
    return (flamesFareFile.includes(restaurant.place_id)) ? <div className={styles.flamesFare}> 🔥 FlamesFare Accepted 🔥</div> :     <></>;
}

// studentDiscount button component
function StudentDiscount({restaurant}) {
    return (studentDiscountFile.includes(restaurant.place_id)) ? <div className={styles.studentDiscount}> 💳 Student Discount 💳</div> :     <></>;
}

export default function RestaurantCard({restaurant}) {
    // function to toggle opening the card
    const [cardOpened, setOpened] = useState(false);
    const openPopup = () => setOpened(prev => !prev);
    
    return (
        <button id={restaurant.place_id} className={styles.layout} onClick={openPopup}>
            {/* First Row */}
            <div className={styles.flexRow}>
                <h2 style={{maxWidth: '50%'}}>{restaurant.name}</h2>
                <p style={{maxWidth: '50%'}}>{restaurant.address}</p>
                {restaurant.distance ? <p>{restaurant.distance} mi </p> : <></>}
            </div>


            {/* Expanded View */}
            {/* Every time we press on the card, it expands the details -- toggleable */}
            {cardOpened && (<div>
                    <h3 className={{}}>Directions</h3>
                    {/* embed a map here!!!! */}
                    <p>{restaurant.details}</p>
                </div>
            )}


            {/* Second row */}
            <div className={styles.flexRow} style={{justifyContent: ""}}>
                {restaurant.hours ? <p>{restaurant.hours}</p> : <></>}
                {/* Flames Fare */}
                <FlamesFare restaurant={restaurant} />
                <StudentDiscount restaurant={restaurant} />

                <div style={{flexGrow: 1}}></div> {/* Force the hours to the left and the stars to the right*/}

                {/* Stars */}
                {restaurant.rating ?
                <div style={{justifySelf:"flex-end"}}>
                    {Array.from({ length: Math.round(restaurant.rating) }, (_, index) => (
                        <Star width="2rem" height="2rem" fill="gold" stroke="#FFBF3F" key={index} />
                    ))}

                    {/* empty stars */}
                    {Array.from({ length: 5-Math.round(restaurant.rating) }, (_, index) => (
                        <Star  width="2rem" height="2rem" key={index} />
                    ))}
                </div>
                : <></>} {/* No rating */} 
            </div>            
            
        </button>
    )
}