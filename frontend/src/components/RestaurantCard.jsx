import styles from './RestaurantCard.module.css';

export default function RestaurantCard({restaurant}) {
    return (
        <div className={styles.layout}>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.miles}</p>
            <p>{restaurant.hours}</p>
            
        </div>
    )
}