import { useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/Input";
import { Navbar } from "../components/ui/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const name = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    // Input validation
    if (!name || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      console.log("Attempting signin with:", { name, backendUrl: BACKEND_URL });
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        name,
        password
      });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Signin error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      const errorMessage = err.response?.data?.message || "Login failed";
      alert(errorMessage);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={false} />
      
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>
          
          <div className="space-y-4">
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} placeholder="Password" type="password" />
            
            <Button 
              onClick={signin} 
              loading={false} 
              size="sm" 
              variant="primary" 
              text="Sign In" 
              fullwidth={true} 
            />
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button 
                onClick={() => navigate("/signup")}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
