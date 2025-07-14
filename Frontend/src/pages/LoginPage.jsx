import { Link } from "react-router";
import { Navbar } from "../Components/Navbar"; 


const LoginPage =() =>{
    // const navigate = useNavigate();
    
    const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;


    const dataObj = {
      email,
      password,
    };
    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });

      const result = await resp.json();

      if (resp.status === 200) {
        alert("Login Successful");
        window.open("/", "_self");
      } else {
        alert("Login Error: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };
    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col">
            <Navbar />
            <form className="max-w-md w-full mx-auto mt-12 bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6" onSubmit={handleLogin}>
                <h2 className="text-3xl font-bold text-center  text-blue-700 mb-2">Login</h2>
                
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
               
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200 shadow"
                >
                    Login
                </button>
                <div>
                    <p>
                        <span>Don't have an account ? </span>
                        <Link to="/signup" className="text-blue-600 hover:underline">SignUp</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export {LoginPage};