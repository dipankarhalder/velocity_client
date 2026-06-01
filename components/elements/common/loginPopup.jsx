"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeLogin, loginSuccess } from "@/store/slices/authSlice";
import { Cross } from "@/components/icons";
import popbg from "../../../public/popbg.jpg";

export const LoginPopup = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.auth.isLoginOpen);
  const { register, handleSubmit } = useForm();
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement;

    // Focusable elements inside modal
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    // Slight timeout to ensure modal is fully rendered in the DOM before searching elements
    const timer = setTimeout(() => {
      const focusableElements = modalRef.current?.querySelectorAll(focusableSelector);
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(closeLogin());
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
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const handleLogin = () => {
    dispatch(loginSuccess({ name: "User", email: "dipankar@gmail.com" }));
  };

  const onSubmit = (data) => console.log(data);

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
              <h2 id="login-title">Sign-in or create account</h2>
              <button
                type="button"
                className="app_cross_btn"
                onClick={() => dispatch(closeLogin())}
                aria-label="Close Login Dialog"
              >
                <Cross aria-hidden="true" focusable="false" />
              </button>
            </div>
            <div className="app_sub_heading">
              <p id="login-description">
                Get access to your Orders, Wishlist and Recommendations
              </p>
            </div>
          </div>
          <div className="app_login_form_inside">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="app_field_item">
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  required
                  {...register("email")}
                />
              </div>
              <div className="app_field_item">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  required
                  {...register("password")}
                />
              </div>
              <div className="app_login_btn">
                <button type="submit">Submit</button>
              </div>
            </form>
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

