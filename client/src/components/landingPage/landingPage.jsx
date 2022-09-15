import {Link} from 'react-router-dom';
import styles from './landingPage.module.css';
import pic from '../../images/henryfood.PNG';

export default function LandingPage(){
    return(
        <div className={styles.landing}>
            <img className={styles.logo} src={pic} alt='welcoming logo'/>
            <button className={styles.homeButton}><Link to='/home'>HOME</Link></button>
        </div>
    )
}