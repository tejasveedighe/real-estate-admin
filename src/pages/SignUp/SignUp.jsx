import React, { useCallback, useState } from "react";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { signupUser } from "../../redux/slices/userSlice";
import styles from "./SignUp.module.css";
import { toast } from "react-toastify";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((store) => store.properties);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rePasswordVisible, setRePasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = useCallback((e) => {
    setSelectedOption(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const repassword = formData.get("re-password");
      const userType = formData.get("userType");
      const phone= formData.get("phoneNumber");

      if (password !== repassword) {
        setPasswordError("Passwords do not match");
        return;
      }

      dispatch(
        signupUser({
          name,
          email,
          password,
          userId: 1,
          userType,
          phone,
        })
      )
        .then((res) => {
          if (res.type === "user/signup/fulfilled") {
            toast.success("Sign Up successfull.")
            navigate("/login");
          } else {
            toast.error(res.error.message);
          }
        })
        .catch((err) => alert(err.message));
    },
    [dispatch, navigate]
  );

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);
  const toggleRePasswordVisibility = useCallback(() => {
    setRePasswordVisible((prev) => !prev);
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
              <span>Sign Up</span>
            </h5>
            <div className="mt-3 w-100 d-flex flex-column gap-4">
              <Form.Group className={styles.input}>
                <Form.Label>I am a</Form.Label>
                <div className="d-flex flex-sm-row flex-column align-items-md-center align-items-start justify-content-between">
                  <Form.Check
                    required
                    type="radio"
                    id="check-buyer"
                    label="Buyer/Owner/Tenant"
                    name="userType"
                    value="Buyer"
                    checked={selectedOption === "buyer"}
                    onChange={handleOptionChange}
                  />
                  <Form.Check
                    required
                    type="radio"
                    id="check-agent"
                    label="Agent/Seller"
                    name="userType"
                    value="Seller"
                    checked={selectedOption === "seller"}
                    onChange={handleOptionChange}
                  />
                </div>
              </Form.Group>

              <FloatingLabel
                label="Name"
                controlId="floatingEmail"
                className={styles.input}
              >
                <Form.Control
                  required
                  type="text"
                  name="name"
                  placeholder="Name"
                />
              </FloatingLabel>
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
                />
              </FloatingLabel>
              <InputGroup>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Password"
                  className={styles.input}
                >
                  <Form.Control
                    required
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                  />
                </FloatingLabel>
                <button type="button" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </InputGroup>
              {passwordError && (
                <span className="text-danger">{passwordError}</span>
              )}
              <InputGroup>
                <FloatingLabel
                  controlId="floatingRePassword"
                  label="Re-Password"
                  className={styles.input}
                >
                  <Form.Control
                    required
                    type={rePasswordVisible ? "text" : "password"}
                    name="re-password"
                    placeholder="Re-Password"
                  />
                </FloatingLabel>
                <button type="button" onClick={toggleRePasswordVisibility}>
                  {rePasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </InputGroup>
              {passwordError && (
                <span className="text-danger">{passwordError}</span>
              )}
              <div className="d-flex align-items-end justify-content-between">
                <Form.Select className={styles.countryCode}>
                  <option defaultChecked>+91 IND</option>
                </Form.Select>
                <FloatingLabel
                  controlId="floatingPhone"
                  label="Phone Number"
                  className={styles.input}
                >
                  <Form.Control
                    required
                    type="tel"
                    name="phoneNumber"
                    pattern="[0-9]{10}"
                    placeholder="Phone Number"
                  />
                </FloatingLabel>
              </div>
              <Button type="submit" className={styles.loginBtn}>
                {loading ? <LoadingSpinner /> : <span>Sign Up</span>}
              </Button>
              <div className="w-100 text-center">
                Already Have an account? &nbsp;
                <Link to="/login" className="text-decoration-none">
                  Login Here.
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </section>
    </main>
  );
}

export default SignUp;
