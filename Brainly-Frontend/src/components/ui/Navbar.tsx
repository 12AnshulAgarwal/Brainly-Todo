import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { Logo } from "../../icons/Logo";

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export function Navbar({ isAuthenticated = false, onLogout }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
        >
          <Logo />
          <span className="text-2xl font-bold text-gray-900">Brainly</span>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Button
              onClick={handleLogout}
              variant="secondary"
              text="Logout"
              size="sm"
            />
          ) : (
            <>
              <Button
                onClick={() => navigate("/signin")}
                variant="secondary"
                text="Sign In"
                size="sm"
              />
              <Button
                onClick={() => navigate("/signup")}
                variant="primary"
                text="Sign Up"
                size="sm"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 