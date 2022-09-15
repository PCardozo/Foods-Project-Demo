import { useSelector,useDispatch } from "react-redux";
import { INDEX_MINUS,INDEX_PLUS} from "../../actions";
import styles from './indexButtons.module.css';

export default function IndexButtons(){
    const pageIndex= useSelector((state)=>state.pageIndex);
    const dispatch= useDispatch();

    return(
        <div className={styles.container}>
            <button className={styles.btn} onClick={()=>{dispatch({type:INDEX_MINUS})}}>👈Prev</button>
            <p className={styles.pageInd}>{'Page '+(pageIndex+1)}</p>
            <button  className={styles.btn} onClick={()=>{dispatch({type:INDEX_PLUS})}}>Next👉</button>
        </div>
    )
}