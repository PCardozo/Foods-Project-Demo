import { useSelector,useDispatch } from "react-redux";
import { INDEX_MINUS,INDEX_PLUS} from "../../actions";

export default function IndexButtons(){
    const pageIndex= useSelector((state)=>state.pageIndex);
    const dispatch= useDispatch();

    return(
        <div>
            <button onClick={()=>{dispatch({type:INDEX_MINUS})}}>Prev</button>
            <p>{'Page '+(pageIndex+1)}</p>
            <button onClick={()=>{dispatch({type:INDEX_PLUS})}}>Next</button>
        </div>
    )
}