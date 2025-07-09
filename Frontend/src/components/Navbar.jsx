import { Link } from "react-router";

const Navbar = () =>{
    return (
        <div className="py-4 px-6 flex justify-between items-center bg-[#131921] shadow-md">
            <div className="text-2xl font-semibold text-white tracking-wide">Shopping App</div>
            <div className="flex gap-2 items-center">
                <input 
                    type="text"
                    placeholder="Search products..."
                    className="py-1.5 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition">Search</button>
            </div>
            <div className="flex gap-4 text-white font-medium">
                <Link to='/profile' className="hover:underline">Profile</Link>
                <Link to='/signup' className="hover:underline">Signup</Link>
            </div>
        </div>
    );
};

export {Navbar};