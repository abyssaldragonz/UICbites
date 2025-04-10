import styles from './RestaurantCard.module.css';

import Star from '../assets/star.svg?react';

function FlamesFare({restaurant}) {
    if (restaurant.flamesFare) {
      return <div className={styles.flamesFare}> 🔥 FlamesFare Accepted 🔥</div>;
    }
    
    return <></>;
  }

export default function RestaurantCard({restaurant}) {
    return (
        <div className={styles.layout}>
            {/* First Row */}
            <div className={styles.flexRow}>
                <h2>{restaurant.name}</h2>
                <p>{restaurant.address}</p>
                {<p>{restaurant.distance} mi</p>}
            </div>

            {/* Second row */}
            <div className={styles.flexRow}>
                <p>Today's Hours: {restaurant.hours}</p>

        
                {/* Flames Fare */}
                <FlamesFare restaurant={restaurant} />

                {/* Stars */}
                <div>
                    {Array.from({ length: Math.round(restaurant.rating) }, (_, index) => (
                        <Star fill="gold" stroke="gold" key={index} />
                    ))}

                    {/* empty stars */}
                    {Array.from({ length: 5-Math.round(restaurant.rating) }, (_, index) => (
                        <Star key={index} />
                    ))}
                </div>

            </div>
        </div>
    )
}