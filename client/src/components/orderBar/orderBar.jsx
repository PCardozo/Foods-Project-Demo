import { ORDER_ALPH_ASC,ORDER_ALPH_DESC,ORDER_HEALTH_ASC,ORDER_HEALTH_DESC } from "../../actions"
import { useDispatch} from "react-redux";

export default function OrderBar(){
    const dispatch= useDispatch();

    return (
        <div>
            <div>
                <input type='button' value='Order Alphabetically DESC' onClick={()=>{dispatch({type:ORDER_ALPH_DESC})}}/>
                <input type='button' value='Order Alphabetically ASC' onClick={()=>{dispatch({type:ORDER_ALPH_ASC})}}/>
            </div>
            <div>
                <input type='button' value='Order by Healthyness DESC' onClick={()=>{dispatch({type:ORDER_HEALTH_DESC})}}/>
                <input type='button' value='Order by Healthyness ASC' onClick={()=>{dispatch({type:ORDER_HEALTH_ASC})}}/>
            </div>
        </div>
    )
}