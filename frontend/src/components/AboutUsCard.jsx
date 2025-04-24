import { Link } from 'react-router-dom';

import styles from './AboutUsCard.module.css';
import MailIcon from '../assets/mailIcon.svg?react';
import InternetIcon from '../assets/internetIcon.svg?react';
import GithubIcon from '../assets/githubIcon.svg?react';
import LinkedinIcon from '../assets/linkedinIcon.svg?react';


export default function AboutBox ({aboutBox}) {
    return (
        <div className={styles.layout}> 
            <div className={styles.about}>
                <h3 className={styles.title}>{aboutBox.title}</h3>
                <h1 className={styles.name}>{aboutBox.name}</h1>
                <p className={styles.tag}>{aboutBox.tag}</p>

                <div className={styles.linksBox}>
                    {aboutBox?.email ?  (<Link style={{height: '0px', textDecoration: 'none'}} to={aboutBox.email} target="_blank" rel="noopener noreferrer">    <MailIcon       className={styles.imageLinks}  />    </Link>) : null}
                    {aboutBox?.site ?   (<Link style={{height: '0px', textDecoration: 'none'}} to={aboutBox.site} target="_blank" rel="noopener noreferrer">     <InternetIcon   className={styles.imageLinks}  />    </Link>) : null}
                    {aboutBox?.git ?    (<Link style={{height: '0px', textDecoration: 'none'}} to={aboutBox.git} target="_blank" rel="noopener noreferrer">      <GithubIcon     className={styles.imageLinks}  />    </Link>) : null}
                    {aboutBox?.linked ? (<Link style={{height: '0px', textDecoration: 'none'}} to={aboutBox.linked} target="_blank" rel="noopener noreferrer">   <LinkedinIcon   className={styles.imageLinks}  />    </Link>) : null}
                </div>

            </div>
        </div>
    );
}