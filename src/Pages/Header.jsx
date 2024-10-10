import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear('users');
        navigate("/login");
    }
    const cartItems = useSelector((state) => state.cart);
    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-2xl px-5">
            <li>
                <Link to={'/user'}>Home</Link>
            </li>
            <li>
                <Link to={'/user'}>All Product</Link>
            </li>
            {!user ? <li>
                <Link to={'/signup'}>Signup</Link>
            </li> : ""}
            {!user ? <li>
                <Link to={'/login'}>Login</Link>
            </li> : ""}
            {user?.role === "user" && <li>
                <Link to={'/user'}>User</Link>
            </li>}
            {user?.role === "admin" && <li>
                <Link to={'/admin'}>Admin</Link>
            </li>}
            {user && <li className="cursor-pointer" onClick={logout}>
                Logout
            </li>}
            <li>
                <Link to={'/cart'} className="flex items-center">
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                 ({cartItems.length})
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="bg-blue-800 sticky top-0">
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
                <div className="left py-3 lg:py-0">
                    <Link to={'/user'}>
                        <h2 className="font-bold text-white text-2xl text-center">Ecommerce</h2>
                    </Link>
                </div>
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>
                <SearchBar />
            </div>
        </nav>
    );
}

export default Navbar;
