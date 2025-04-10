import styles from './Page.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
// import restaurantInfo from '../assets/sampleRestaurantInfo.json';
import { usePapaParse } from 'react-papaparse';
import csvFile from '../../../backend/restaurants.csv?raw';


var restaurantInfo;

async function storeData(data) {
    restaurantInfo = data;
    console.log("CALLBACK FUNCTION");
    console.log(restaurantInfo);
}
console.log(restaurantInfo);

async function parseData(callBack) {
    const { readString } = usePapaParse();
    const papaConfig = {
            worker: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                // console.log('---------------------------');
                // console.log(results);
                // console.log('---------------------------');
                callBack(results.data);
            },
        }
    readString(csvFile, papaConfig);
}


  
export default function ExplorePage() {
    parseData(storeData);
    console.log(restaurantInfo);

    return (
        <div className={styles.layout}>
            <Header />
            <h1> HI WELCOME TO EXPLORE PAGE </h1>

            <p> intro </p>

            <section id={styles.exploreSection}>
                {/* {restaurantInfo && restaurantInfo.map((item, index) => (
                    <RestaurantCard key={index} restaurant={item}></RestaurantCard>
                ))} */}
                {Array.from({ length: (restaurantInfo) }, (_, index) => (
                    <p> HI</p>
                ))}
            </section>    

            <Footer /> 
        </div>
    )
}