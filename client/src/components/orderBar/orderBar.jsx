import { ORDER_ALPH_ASC,ORDER_ALPH_DESC,ORDER_HEALTH_ASC,ORDER_HEALTH_DESC } from "../../actions"
import { useDispatch} from "react-redux";
import styles from './orderBar.module.css';

export default function OrderBar(){
    const dispatch= useDispatch();

    return (
            <div className={styles.orderSctn}>
                <input type='button' className={styles.btn} value='Order Alphabetically DESC' onClick={()=>{dispatch({type:ORDER_ALPH_DESC})}}/>
                <input type='button' className={styles.btn} value='Order Alphabetically ASC' onClick={()=>{dispatch({type:ORDER_ALPH_ASC})}}/>
                <input type='button' className={styles.btn} value='Order by Healthyness DESC' onClick={()=>{dispatch({type:ORDER_HEALTH_DESC})}}/>
                <input type='button' className={styles.btn} value='Order by Healthyness ASC' onClick={()=>{dispatch({type:ORDER_HEALTH_ASC})}}/>
            </div>
    )
}