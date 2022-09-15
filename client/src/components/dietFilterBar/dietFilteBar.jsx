import { useSelector,useDispatch } from "react-redux";
import {SET_FILTER_ACTIVE,SET_FILTER_INACTIVE,setDietFilter} from '../../actions/index'
import styles from './dietFilterBar.module.css';

export default function DietFilterBar(){
    const activeFilter = useSelector((state)=>state.activeFilter);
    const dispatch = useDispatch();
    
    let btnTxt="";
    if(!activeFilter){
        btnTxt="✅Apply"
    } else{
        btnTxt="❌Remove"
    }

    function handleFilter(e){
        e.preventDefault();
        let coll=e.target.children;
        let filterDiets=[]
        if(!activeFilter){
            for (const element of coll) {
                if (element.type==="checkbox" && element.checked) {
                    filterDiets.push(element.name)
                }
            }
            if(filterDiets.length>0){
                console.log('Applied filters were:',filterDiets)
                dispatch(setDietFilter(filterDiets))
                dispatch({type:SET_FILTER_ACTIVE})
            } else{
                alert('Must check at least one value in order to filter');
            }   
        } else{
            for (const element of coll) {
                if (element.type==="checkbox" && element.checked) {
                    element.checked=false;
                }
            }
            dispatch({type:SET_FILTER_INACTIVE})
        }
        
    }

    return(
        <div className={styles.container}>
        <h4 className={styles.title}>Filters:</h4>
        <form  onSubmit={(e)=>{handleFilter(e)}}>
            <input  type="checkbox" id="glutenFree" name="gluten free"/>
                <label className={styles.tag} htmlFor="glutenFree">Gluten free</label>
            <input className={styles.chk} type="checkbox" id="dairyFree" name="dairy free"/>
                <label className={styles.tag} htmlFor="dairyFree">Dairy free</label>
            <input type="checkbox" id="lactoOvoVegetarian" name="lacto ovo vegetarian"/>
                <label className={styles.tag} htmlFor="lactoOvoVegetarian">Lacto ovo vegetarian</label>
            <input type="checkbox" id="lactoVegetarian" name="lacto vegetarian"/>
                <label className={styles.tag} htmlFor="lactoVegetarian">Lacto vegetarian</label>
            <input type="checkbox" id="vegan" name="vegan"/>
                <label className={styles.tag} htmlFor="vegan">Vegan</label>
            <input type="checkbox" id="paleolithic" name="paleolithic"/>
                <label className={styles.tag} htmlFor="paleolithic">Paleolithic</label>
            <input type="checkbox" id="primal" name="primal"/>
                <label className={styles.tag} htmlFor="primal">Primal</label>
                <br></br>
            <input type="checkbox" id="pescatarian" name="pescatarian"/>
                <label className={styles.tag} htmlFor="pescatarian">Pescatarian</label>
            <input type="checkbox" id="whole30" name="whole 30"/>
                <label className={styles.tag} htmlFor="whole30">Whole 30</label>
            <input type="checkbox" id="vegetarian" name="vegetarian"/>
                <label className={styles.tag} htmlFor="vegetarian">Vegetarian</label>
            <input type="checkbox" id="ovoVegetarian" name="ovo vegetarian"/>
                <label className={styles.tag} htmlFor="ovoVegetarian">Ovo vegetarian</label>
            <input type="checkbox" id="ketogenic" name="ketogenic"/>
                <label className={styles.tag} htmlFor="ketogenic">Ketogenic</label>
            <input type="checkbox" id="fodmapFriendly" name="fodmap friendly"/>
                <label className={styles.tag} htmlFor="fodmapFriendly">FODMAP</label>
            <br></br>
            <input type="submit" value={btnTxt} className={styles.btn}></input>
        </form>
        </div>
    )
}