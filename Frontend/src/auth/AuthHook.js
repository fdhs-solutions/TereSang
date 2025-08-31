import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthHook = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem("userInfo"));

      if (!session) return setUser(null);

      // Check token expiration (optional)
      if (
        session.tokenExpirationInMilis &&
        new Date(session.tokenExpirationInMilis) < new Date()
      ) {
        localStorage.clear();
        navigate("/login");
        return setUser(null);
      }

      setUser(session);
    } catch (err) {
      console.error("AuthHook error:", err);
      setUser(null);
    }
  }, [navigate]);

  return user;
};

export default AuthHook;
