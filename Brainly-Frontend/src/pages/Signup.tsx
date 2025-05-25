import { useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/Input";
import { Navbar } from "../components/ui/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    // Input validation
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      console.log("Attempting signup with:", { username, backendUrl: BACKEND_URL });
      await axios.post(BACKEND_URL + "/api/v1/signup", {
        name: username,
        password
      });
      alert("Account created successfully!");
      navigate("/signin");
    } catch (err: any) {
      console.error("Signup error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      const errorMessage = err.response?.data?.message || "Signup failed";
      alert(errorMessage);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={false} />
      
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-600">Get started with your second brain today</p>
          </div>
          
          <div className="space-y-4">
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} placeholder="Password" type="password" />
            
            <Button 
              onClick={signup} 
              loading={false} 
              size="sm" 
              variant="primary" 
              text="Sign Up" 
              fullwidth={true} 
            />
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button 
                onClick={() => navigate("/signin")}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
