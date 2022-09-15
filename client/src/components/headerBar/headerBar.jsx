import {Link} from 'react-router-dom';
import { getRecipesByName } from '../../actions';
import { useDispatch } from 'react-redux';
import styles from './headerBar.module.css';
import DietFilterBar from "../dietFilterBar/dietFilteBar";
import OrderBar from "../orderBar/orderBar";

export default function HeaderBar(){
    const dispatch = useDispatch();

    function handleSearch(e){
        e.preventDefault();
        let string = e.target.children.searchBox.value;
        e.target.children.searchBox.value ='';
        console.log('getting recipes...');
        dispatch(getRecipesByName(string));
    }

    return(
        <div className={styles.across}>
            <DietFilterBar/>
            <OrderBar/>
            <div>
                <form className={styles.srchSctn} onSubmit={(e)=>{handleSearch(e)}}>
                    <label htmlFor='searchBox'>Search for a Recipe</label>
                    <input type="text" name="searchBox" id="searchBox" placeholder='Search a recipe...'/>
                    <input id='srchBtn' type='submit' value='Search 🔍'/>
                    <label htmlFor='srchBtn'>- Or -</label>
                    <button><Link to='/create'>Create a new recipe</Link></button>
                </form>
            </div>
        </div>
    )
}