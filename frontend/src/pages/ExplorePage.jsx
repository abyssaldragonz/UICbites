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
import restaurantJSON from '../assets/sampleRestaurantInfo.json';
import { usePapaParse } from 'react-papaparse';
import csvFile from '../../../backend/restaurants.csv?raw';
import { parse } from 'papaparse';

let restaurantInfo = [];

async function storeData(data) {
    restaurantInfo = data;
    console.log("CALLBACK FUNCTION");
    // console.log(restaurantInfo);
}


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
                restaurantInfo = results.data;
            },
        }
    readString(csvFile, papaConfig);
}




export default function ExplorePage() {
    const [restaurantInfo, setData] = useState([]);

    // const parseData = () => {
    //     const { readString } = usePapaParse();
    //     const papaConfig = {
    //             worker: true,
    //             header: true,
    //             skipEmptyLines: true,
    //             complete: (results) => {
    //                 // console.log('---------------------------');
    //                 // console.log(results);
    //                 // console.log('---------------------------');
    //                 setData(results.data);
    //             },
    //         }
    //     readString(csvFile, papaConfig);
    // }


    useEffect(() => {
        const { readString } = usePapaParse();
        const papaConfig = {
                worker: true,
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    // console.log('---------------------------');
                    // console.log(results);
                    // console.log('---------------------------');
                    setData(results.data);
                },
            }
        readString(csvFile, papaConfig);

        console.log(restaurantInfo);
    }, []);

    // setTimeout(()=> {
    //     console.log(restaurantInfo);
    //     console.log(restaurantInfo[0]);
    // }, 1500);

    console.log(restaurantInfo);
    console.log(restaurantInfo[0].name)

    return (
        <div className={styles.layout}>
            <Header />
            <h1> HI WELCOME TO EXPLORE PAGE </h1>

            <p> intro </p>

            <section id={styles.exploreSection}>                
                {restaurantInfo && restaurantInfo.map((item, index) => (
                    <RestaurantCard key={index} restaurant={item}></RestaurantCard>
                ))}
            </section>    

            <Footer /> 
        </div>
    )
}