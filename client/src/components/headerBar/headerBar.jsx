import {Link} from 'react-router-dom';
import { getRecipesByName } from '../../actions';
import { useDispatch } from 'react-redux';

export default function HeaderBar(){
    const dispatch = useDispatch();

    function handleSearch(e){
        e.preventDefault();
        let string = e.target.children.searchBox.value;
        e.target.children.searchBox.value ='';
        console.log('getting recipes');
        dispatch(getRecipesByName(string));
    }

    return(
        <span>
            <form onSubmit={(e)=>{handleSearch(e)}}>
                <input type="text" name="searchBox" id="searchBox" placeholder='Search a recipe...'/>
                <input type='submit' value='Search 🔍'/>
            </form>
            <Link to='/create'>
                <button type='button'>Crear nueva receta</button>
            </Link>
        </span>
    )
}