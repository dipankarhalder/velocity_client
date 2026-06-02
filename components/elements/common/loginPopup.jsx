"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/useAuthStore";
import { Cross } from "@/components/icons";
import popbg from "../../../public/popbg.jpg";

export const LoginPopup = () => {
  const isOpen = useAuthStore((state) => state.isLoginOpen);
  const closeLogin = useAuthStore((state) => state.closeLogin);
  const loginSuccess = useAuthStore((state) => state.loginSuccess);

  const { register, handleSubmit, reset } = useForm();
  const modalRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Reset signup state when popup opens
    setIsSignUp(false);
    reset();

    const previousActiveElement = document.activeElement;
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    const timer = setTimeout(() => {
      const focusableElements = modalRef.current?.querySelectorAll(focusableSelector);
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLogin();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(focusableSelector);
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [isOpen, closeLogin, reset]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    if (isSignUp) {
      if (data.password !== data.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Signing Up:", data);
      loginSuccess({ name: data.name, email: data.email });
    } else {
      console.log("Signing In:", data);
      loginSuccess({ name: "User", email: data.email });
    }
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setIsSignUp((prev) => !prev);
    reset();
  };

  return (
    <div
      className="app_login_popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      aria-describedby="login-description"
      ref={modalRef}
    >
      <div className="app_inside_login_app">
        <div className="app_login_left_side">
          <div className="app_heading_log">
            <div className="app_heading_inside_log">
              <h2 id="login-title">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <button
                type="button"
                className="app_cross_btn"
                onClick={closeLogin}
                aria-label="Close Dialog"
              >
                <Cross aria-hidden="true" focusable="false" />
              </button>
            </div>
            <div className="app_sub_heading">
              <p id="login-description">
                {isSignUp
                  ? "Sign up to track orders, manage wishlist, and build your custom PC"
                  : "Sign in to manage your Orders, Wishlist and Custom PC Builds"}
              </p>
            </div>
          </div>
          
          <div className="app_login_form_inside">
            <form onSubmit={handleSubmit(onSubmit)}>
              {isSignUp && (
                <div className="app_field_item">
                  <label htmlFor="login-name">Full Name</label>
                  <input
                    id="login-name"
                    type="text"
                    placeholder="John Doe"
                    required
                    {...register("name")}
                  />
                </div>
              )}
              <div className="app_field_item">
                <label htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  {...register("email")}
                />
              </div>
              <div className="app_field_item">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  {...register("password")}
                />
              </div>
              {isSignUp && (
                <div className="app_field_item">
                  <label htmlFor="login-confirm-password">Confirm Password</label>
                  <input
                    id="login-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    {...register("confirmPassword")}
                  />
                </div>
              )}

              {!isSignUp && (
                <div className="app_login_extra_actions">
                  <label className="app_remember_me">
                    <input type="checkbox" />
                    <span>Remember Me</span>
                  </label>
                  <a href="#" className="app_forgot_password" onClick={(e) => e.preventDefault()}>
                    Forgot Password?
                  </a>
                </div>
              )}

              <div className="app_login_btn">
                <button type="submit">
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </form>

            <div className="app_social_divider">
              <span>Or continue with</span>
            </div>

            <div className="app_social_login_grid">
              <button
                type="button"
                className="app_social_login_btn google"
                onClick={() => console.log("Google Action")}
                aria-label={`Sign ${isSignUp ? "up" : "in"} with Google`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="app_social_login_btn github"
                onClick={() => console.log("GitHub Action")}
                aria-label={`Sign ${isSignUp ? "up" : "in"} with GitHub`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            <div className="app_login_signup_prompt">
              <span>
                {isSignUp
                  ? "Already have an account? "
                  : "Don't have an account? "}
              </span>
              <a href="#" onClick={toggleMode}>
                {isSignUp ? "Sign In" : "Sign Up"}
              </a>
            </div>
          </div>
        </div>
        <div className="app_login_right_side">
          <Image
            src={popbg}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

