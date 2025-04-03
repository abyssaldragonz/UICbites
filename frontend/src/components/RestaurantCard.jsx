import styles from './RestaurantCard.module.css';

export default function RestaurantCard({restaurant}) {
    return (
        <div className={styles.layout}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.miles}</p>
            <p>{restaurant.hours}</p>
        </div>
    )
}