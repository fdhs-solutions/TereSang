import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthHook = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem("userInfo"));

      if (!session) return setUser(null);

      // Check token expiration
      if (
        session.tokenExpirationInMilis &&
        new Date(session.tokenExpirationInMilis) < new Date()
      ) {
        localStorage.clear();
        navigate("/login");
        return setUser(null);
      }

      // ✅ Return only session.data so UI doesn’t break
      setUser({
        ...session.data, // userName, mobileNumber, etc.
        jwtToken: session.jwtToken,
        tokenExpirationInMilis: session.tokenExpirationInMilis,
      });
    } catch (err) {
      console.error("AuthHook error:", err);
      setUser(null);
    }
  }, [navigate]);

  return user;
};

export default AuthHook;
