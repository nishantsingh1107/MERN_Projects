import { Link } from "react-router";

const Navbar = () =>{
    return (
        <div className="py-4 px-6 flex justify-between bg-blue-500">
            <div className="text-2xl font-bold text-white">Shopping App</div>
            <div className="flex gap-2">
                <input className="b-1 py-1 px-2 rounded-md border-1 border-white"/>
                <button className="b-1 py-1 px-2 rounded-md border-1 border-white text-white">Search</button>
            </div>
            <div className="flex gap-2 text-white">
                <Link to='/profile'>Profile</Link>
                <Link to='/signup'>Signup</Link>
            </div>
        </div>
    );
};

export {Navbar};