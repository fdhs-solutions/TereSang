// src/pages/ForgotPassword.jsx
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AxiosConfig } from "../../config/AxiosConfig";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("ENTER_EMAIL"); // ENTER_EMAIL | ENTER_OTP | RESET_PASSWORD
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const otpRef = useRef(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // resend timer
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // focus OTP when step changes
  useEffect(() => {
    if (step === "ENTER_OTP" && otpRef.current) {
      otpRef.current.focus();
    }
  }, [step]);

  const sendOtp = async () => {
    if (!email) {
      Swal.fire("Error", "Please enter your email।", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await AxiosConfig.post("/auth/forgot-password", { email });
      if (res.data && res.data.success) {
        Swal.fire("Success", res.data.message || "OTP sent successfully", "success");
        setStep("ENTER_OTP");
        setResendTimer(60); // 60s cooldown
      } else {
        Swal.fire("Error", res.data?.message || "Failed to send OTP", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err?.response?.data?.message || "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length < 4) {
      Swal.fire("Error", "please enter a valid OTP", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await AxiosConfig.post("/auth/verify-otp", { email, otp });
      if (res.data && res.data.success) {
        Swal.fire("Success", res.data.message || "OTP verified successfully", "success");
        setStep("RESET_PASSWORD");
      } else {
        Swal.fire("Error", res.data?.message || "Invalid OTP", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err?.response?.data?.message || "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      Swal.fire("Error", "Password must be at least 6 characters", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "New password and Confirm password do not match", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await AxiosConfig.post("/auth/reset-password", {
        email,
        newPassword,
      });
      if (res.data && res.data.success) {
        Swal.fire("Success", res.data.message || "Password reset successfully", "success").then(
          () => navigate("/login")
        );
      } else {
        Swal.fire("Error", res.data?.message || "Failed to reset", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err?.response?.data?.message || "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    await sendOtp();
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-fixed bg-cover" style={{ backgroundImage: "url('/path/to/your/background/image.jpg')" }}>
      <div className="w-11/12 md:w-1/2 lg:w-1/3 py-8">
        <div className="container bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
          <h3 className="text-center mb-4 text-blue-800 font-semibold">Forgot Password</h3>

          {loading && <div className="text-center mb-4">Processing...</div>}

          {step === "ENTER_EMAIL" && (
            <div>
              <label className="block font-medium mb-1">Registered Email</label>
              <div className="flex items-center border border-gray-300 rounded mb-4">
                <span className="px-2 text-blue-800"><i className="fas fa-envelope"></i></span>
                <input type="email" className="p-2 flex-1 rounded outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <button className="w-full py-2 bg-blue-800 text-white rounded" onClick={sendOtp} disabled={loading}>Send OTP</button>
            </div>
          )}

          {step === "ENTER_OTP" && (
            <div>
              <p className="mb-2 text-gray-700">We have sent an OTP to <strong>{email}</strong>, please enter it below:</p>
              <input ref={otpRef} type="text" inputMode="numeric" pattern="\d*" maxLength={6} className="w-full p-2 border rounded mb-3" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} />
              <div className="flex gap-2">
                <button onClick={verifyOtp} className="flex-1 py-2 bg-green-600 text-white rounded" disabled={loading}>Verify OTP</button>
                <button onClick={handleResend} className="flex-1 py-2 bg-gray-200 rounded" disabled={resendTimer > 0}>
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                </button>
              </div>
              <p className="mt-3 text-sm">
                Not your email? <button className="text-blue-600 underline" onClick={() => setStep("ENTER_EMAIL")}>Use a different email</button>
              </p>
            </div>
          )}

          {step === "RESET_PASSWORD" && (
            <div>
              <label className="block font-medium mb-1">New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 border rounded mb-3" />
              <label className="block font-medium mb-1">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded mb-3" />
              <button onClick={resetPassword} className="w-full py-2 bg-blue-800 text-white rounded" disabled={loading}>Update Password</button>
            </div>
          )}

          <p className="mt-4 text-center text-gray-600">Remembered? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login here</Link></p>
        </div>
      </div>
    </div>

  );
};

export default ForgotPassword;
