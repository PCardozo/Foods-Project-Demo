import {Link} from 'react-router-dom';

export default function HeaderBar(){
    return(
        <span>
            This the headerbar
            <input type="text" name="fname" placeholder='Search a recipe...'/>
            <button type='button'>Buscar 🔍</button>
            <Link to='/create'>
                <button type='button'>Crear nueva receta</button>
            </Link>
        </span>
    )
}