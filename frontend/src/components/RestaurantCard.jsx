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
                <h2 style={{maxWidth: '50%'}}>{restaurant.name}</h2>
                <p style={{maxWidth: '50%'}}>{restaurant.address}</p>
                {restaurant.distance ? <p>{restaurant.distance} mi </p> : <></>}
            </div>

            {/* Second row */}
            <div className={styles.flexRow} style={{justifyContent: "center"}}>
                {restaurant.hours ? <p>Today's Hours: {restaurant.hours}</p> : <></>}
                {/* Flames Fare */}
                <FlamesFare restaurant={restaurant} />

                <div style={{flexGrow: 1}}></div> {/* Force the hours to the left and the stars to the right*/}

                {/* Stars */}
                {restaurant.rating ?
                <div style={{justifySelf:"flex-end"}}>
                    {Array.from({ length: Math.round(restaurant.rating) }, (_, index) => (
                        <Star fill="gold" stroke="gold" key={index} />
                    ))}

                    {/* empty stars */}
                    {Array.from({ length: 5-Math.round(restaurant.rating) }, (_, index) => (
                        <Star key={index} />
                    ))}
                </div>
                : <></>} {/* No rating */}
                
            </div>
        </div>
    )
}