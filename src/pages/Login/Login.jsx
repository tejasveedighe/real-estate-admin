import classNames from "classnames";
import Cookies from "js-cookie";
import React, { useCallback, useState } from "react";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { loginUser } from "../../redux/slices/userSlice";
import { isValidEmail } from "../../utils/helpers";
import styles from "./Login.module.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((store) => store.user);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleNext = useCallback(() => {
    if (isValidEmail(enteredEmail) && enteredEmail.trim() !== "") {
      setEmailCheck(true);
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address.");
    }
  }, [enteredEmail]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");

      dispatch(
        loginUser({
          email,
          password,
        })
      )
        .then((res) => {
          if (res.type === "user/login/fulfilled") {
            if (res.payload.token) {
              Cookies.set("userToken", res.payload.token);
              Cookies.set("userEmail", res.payload.userDetails.email);
              Cookies.set("userName", res.payload.userDetails.name);
              Cookies.set("userId", res.payload.userDetails.userId);
              navigate("/");
              toast.success("Login Successfull");
            }
          } else {
            toast.error("Login Failed, credentials not found");
          }
        })
        .catch((err) => console.log(err.message));
    },
    [dispatch, navigate]
  );

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  return (
    <main className={styles.loginPage}>
      <section className={styles.right}>
        <div className={styles.formContainer}>
          <Form
            onSubmit={onSubmit}
            className="d-flex flex-column align-items-start gap-2"
          >
            <h5>
              {emailCheck && (
                <MdArrowBack
                  role="button"
                  onClick={() => setEmailCheck((prev) => !prev)}
                />
              )}
              <span>&nbsp;Login</span>
            </h5>
            <div className="w-100 d-flex flex-column gap-4">
              <FloatingLabel
                label="Email Address"
                controlId="floatingEmail"
                className={styles.input}
              >
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={enteredEmail}
                  onChange={(e) => setEnteredEmail(e.target.value)}
                  isValid={emailError.length}
                />
              </FloatingLabel>
              {emailError && <p className="text-danger">{emailError}</p>}

              {!emailCheck && (
                <Button className={styles.loginBtn} onClick={handleNext}>
                  Next
                </Button>
              )}
              {emailCheck && (
                <>
                  <InputGroup className="mb-3">
                    <FloatingLabel
                      controlId="floatingPassword"
                      label="Password"
                      className={styles.input}
                    >
                      <Form.Control
                        autoFocus
                        required
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        placeholder="Enter Password"
                      />
                    </FloatingLabel>
                    <button type="button" onClick={togglePasswordVisibility}>
                      {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </InputGroup>
                  <Button type="submit" className={styles.loginBtn}>
                    {loading ? <LoadingSpinner /> : <span>Login</span>}
                  </Button>
                </>
              )}
              <div className="w-100">
                <Link
                  to="/forgot-password"
                  className="text-decoration-none float-end"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </Form>
          {!emailCheck ? (
            <div className={classNames(styles.formBottom, "w-100 text-center")}>
              Don't have an account?&nbsp;
              <Link to="/signup" className="fw-semibold">
                Sign Up
              </Link>
              &nbsp; here
            </div>
          ) : null}
        </div>
        &nbsp;
      </section>
    </main>
  );
}

export default Login;
