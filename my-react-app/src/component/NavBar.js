// Application Specific Imports

//Styles
import '../stylesheet/NavBar.css';

/**
 * Navigation feature for the top bar that user can interact for user profile, login, logout.
 * @returns {JSX.Element}
 * @constructor
 */
function NavBar() {
    return (
        <div id="navigation_bar">
            <h1 className="nav_title">
                HMI File Control Interface
            </h1>
        </div>
    );
}

export default NavBar;