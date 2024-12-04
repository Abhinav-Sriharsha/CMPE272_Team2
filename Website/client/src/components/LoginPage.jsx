import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebaseConfig"; // Import functions explicitly

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(false); // Toggle between sign-in and login
  const navigate = useNavigate();

  // Handle user login (email/password)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); // Use the modular SDK function
      navigate("/home"); // Redirect to home page after successful login
    } catch (error) {
      setError(error.message || "Invalid email or password");
    }
  };

  // Handle user sign-up (create a new user)
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Use the modular SDK function
      navigate("/home"); // Redirect to home page after successful sign-up
    } catch (error) {
      setError(error.message || "Error during sign-up");
    }
  };

  // Handle Google login
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider()); // Use the modular SDK function
      console.log(result.user); // Here you can access the logged-in user's data if needed
      navigate("/home"); // Redirect to home page after successful Google login
    } catch (error) {
      setError(error.message || "Error with Google Sign-In");
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignIn ? "Sign Up" : "Login"}</h2>
      {error && <div className="error">{error}</div>}

      {/* Form for login or sign-up */}
      <form onSubmit={isSignIn ? handleSignIn : handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignIn ? "Sign Up" : "Login"}</button>
      </form>

      {/* Toggle between login and sign-up */}
      <button onClick={() => setIsSignIn(!isSignIn)}>
        {isSignIn
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </button>

      {/* Google Sign-in */}
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default LoginPage;
