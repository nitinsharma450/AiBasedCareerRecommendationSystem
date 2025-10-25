import  { useEffect } from "react";
import { ApiConfigs } from "../lib/ApiConfigs";
import { useNavigate } from "react-router";
 

export default function Logout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem(ApiConfigs.userLocalStorage);
    navigate("/login"); // ✅ redirect after logout
  }

  useEffect(() => {
    logout();
  }, []);

  return (
   <>
   <div></div>
   </>
  );
}
