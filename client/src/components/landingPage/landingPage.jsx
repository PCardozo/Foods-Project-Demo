import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            This the landing page
            <Link to='/home'>
                <button type='button'>HOME</button>
            </Link>
        </div>
    )
}