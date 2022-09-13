import { useSelector,useDispatch } from "react-redux";
import {SET_FILTER_ACTIVE,SET_FILTER_INACTIVE,FILTER_BY_DIET_TYPE,setDietFilter} from '../../actions/index'
export default function DietFilterBar(){
    const activeFilter = useSelector((state)=>state.activeFilter);
    const dispatch = useDispatch();
    
    let btnTxt="";
    if(!activeFilter){
        btnTxt="✔Apply Filters"
    } else{
        btnTxt="❌Remove Filters"
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
                console.log('log from handlefilter',filterDiets)
                dispatch(setDietFilter(filterDiets))
                dispatch({type:FILTER_BY_DIET_TYPE})
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
            dispatch(setDietFilter([]))
            dispatch({type:SET_FILTER_INACTIVE})
        }
        
    }

    return(
        <form onSubmit={(e)=>{handleFilter(e)}}>
            <input type="checkbox" id="glutenFree" name="gluten free"/>
                <label htmlFor="glutenFree">Gluten free</label>
            <input type="checkbox" id="dairyFree" name="dairy free"/>
                <label htmlFor="dairyFree">Dairy free</label>
            <input type="checkbox" id="lactoOvoVegetarian" name="lacto ovo vegetarian"/>
                <label htmlFor="lactoOvoVegetarian">Lacto ovo vegetarian</label>
            <input type="checkbox" id="lactoVegetarian" name="lacto vegetarian"/>
                <label htmlFor="lactoVegetarian">Lacto vegetarian</label>
            <input type="checkbox" id="vegan" name="vegan"/>
                <label htmlFor="vegan">Vegan</label>
            <input type="checkbox" id="paleolithic" name="paleolithic"/>
                <label htmlFor="paleolithic">Paleolithic</label>
            <input type="checkbox" id="primal" name="primal"/>
                <label htmlFor="primal">Primal</label>
            <input type="checkbox" id="pescatarian" name="pescatarian"/>
                <label htmlFor="pescatarian">Pescatarian</label>
            <input type="checkbox" id="fodmapFriendly" name="fodmap friendly"/>
                <label htmlFor="fodmapFriendly">FODMAP friendly</label>
            <input type="checkbox" id="whole30" name="whole 30"/>
                <label htmlFor="whole30">Whole 30</label>
            <input type="checkbox" id="vegetarian" name="vegetarian"/>
                <label htmlFor="vegetarian">Vegetarian</label>
            <input type="checkbox" id="ovoVegetarian" name="ovo vegetarian"/>
                <label htmlFor="ovoVegetarian">Ovo vegetarian</label>
            <input type="submit" value={btnTxt}></input>
        </form>
    )
}