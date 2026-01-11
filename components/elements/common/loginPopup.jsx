"use client";

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

  if (!isOpen) return null;
  const handleLogin = () => {
    dispatch(loginSuccess({ name: "User", email: "dipankar@gmail.com" }));
  };

  const onSubmit = (data) => console.log(data);

  return (
    <div className="app_login_popup">
      <div className="app_inside_login_app">
        <div className="app_login_left_side">
          <div className="app_heading_log">
            <div className="app_heading_inside_log">
              <h2>Sign-in or create account</h2>
              {/* <button
                className="bg-blue-600 text-white w-full py-2 rounded"
                onClick={handleLogin}
              >
                Login
              </button> */}
              <button
                className="app_cross_btn"
                onClick={() => dispatch(closeLogin())}
              >
                <Cross />
              </button>
            </div>
            <div className="app_sub_heading">
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
          </div>
          <div className="app_login_form_inside">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="app_field_item">
                <p>Email</p>
                <input type="email" {...register("email")} />
              </div>
              <div className="app_field_item">
                <p>Password</p>
                <input type="password" {...register("password")} />
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
            alt={"pop background"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};
