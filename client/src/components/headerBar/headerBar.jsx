import {Link} from 'react-router-dom';
import { CLEAR_RECIPES, getRecipesByName, SET_FILTER_INACTIVE } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './headerBar.module.css';
import DietFilterBar from "../dietFilterBar/dietFilteBar";
import OrderBar from "../orderBar/orderBar";

export default function HeaderBar(){
    const dispatch = useDispatch();
    const activeFilter = useSelector((state)=>state.activeFilter)
    function handleSearch(e){
        e.preventDefault();
        let string = e.target.children.searchBox.value;
        if(string.length<1){
            alert('Must enter a value in order to search');
            return;
        }
        if(string.trim().length === 0){
            alert('Must enter a valid string in order to search');
            e.target.children.searchBox.value='';
            return;
        }
        let filterBar = document.getElementById('filterBar');
        let coll = filterBar.children;
        for (const element of coll) {
            if (element.type==="checkbox" && element.checked) {
                element.checked=false;
            }
        }
        e.target.children.searchBox.value ='';
        if(activeFilter){
            dispatch({type:CLEAR_RECIPES})
            dispatch({type:SET_FILTER_INACTIVE})
        }
        console.log('getting recipes...');
        dispatch(getRecipesByName(string));
    }

    return(
        <div className={styles.across}>
            <DietFilterBar/>
            <OrderBar/>
            <div>
                <form className={styles.srchSctn} onSubmit={(e)=>{handleSearch(e)}}>
                    <label className={styles.title} htmlFor='searchBox'>Search for a Recipe</label>
                    <input type="text" name="searchBox" id="searchBox" placeholder='Search a recipe...' autoComplete="off"/>
                    <input className={styles.btn} id='srchBtn' type='submit' value='Search 🔍'/>
                    <label htmlFor='createBtn'>- Or -</label>
                    <Link to='/create' id='createBtn' className={styles.link}><button type='button'className={styles.btn}>Create a new recipe 📃</button></Link>
                </form>
            </div>
        </div>
    )
}