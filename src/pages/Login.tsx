import React, { FormEvent, useContext, useRef, useState } from "react";
import { Link, NavigateFunction, useLocation, useNavigate } from "react-router-dom";

import AuthWith from "../assets/components/AuthWith";
import { ReactComponent as GoogleIcon } from "../assets/svg/google.svg";
import { ReactComponent as Flies } from "../assets/svg/flies.svg";
import FacebookIcon from "../assets/img/facebook.png";
import SideNotif from "../assets/components/modal/SideNotif";
import Submit from "../assets/components/button/Submit";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase/firebase";
import { AuthErrorCodes, UserCredential } from "firebase/auth";

function LoginPage() {
    const navigate: NavigateFunction = useNavigate();

    const location: string = useLocation().search;
    const search: URLSearchParams = new URLSearchParams(location);
    const registerSuccess: string | null = search.get("creatingAccount");

    const [errorMsg, setError] = useState<string>("");
    const [btnState, setBtnState] = useState<string>("idle");

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");

        const email: string = emailRef.current?.value!;
        const password: string = passwordRef.current?.value!;

        if (email.length < 1 || password.length < 1) {
            setError("Email and password must be filled in");
            return;
        }

        setBtnState("loading");
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: UserCredential) => {
                // Signed in
                const { user } = userCredential;
                if (user) {
                    navigate("/chats");
                }
            })
            .catch((error) => {
                const errorCode = error?.code;
                const errorMessage = error?.message;
                
                switch (errorCode) {
                    case "auth/invalid-login-credentials":
                        setError("Wrong email or password"); break;
                    default:
                        setError(errorMessage);
                }
                console.error(errorCode, errorMessage);
            })
            .finally(() => {
                setBtnState("idle");
            })
    };

    return (
        <>
            {registerSuccess && (
                <SideNotif>
                    Successful creating a new account, now login
                </SideNotif>
            )}
            <div className="form-fadder">
                <div className="form-container form-container__h-auto form-container__w-auto-smol form-container__grid-slice-dope">
                    <header>
                        <h1>Welcome Back!</h1>
                        <div>Let's continue your conversation!</div>
                        <div className="form-auths">
                            <AuthWith icon={<GoogleIcon />}>Google</AuthWith>
                            <AuthWith
                                icon={<img src={FacebookIcon} alt="facebook" />}
                            >
                                Facebook
                            </AuthWith>
                        </div>
                        <div className="static__svg-flies">
                            <Flies />
                        </div>
                    </header>
                    <div className="form-wrapper">
                        <form>
                            <div className="form-control">
                                <div className="form-item" aria-required>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        ref={emailRef}
                                        placeholder="Enter your email"
                                        id="email"
                                    />
                                </div>
                                <div className="form-item" aria-required>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        ref={passwordRef}
                                        placeholder="At least 8 characters"
                                        id="password"
                                    />
                                </div>
                                <div className="form-error">{errorMsg}</div>
                                <div className="form-item" aria-required>
                                    <Submit
                                        onClick={handleSubmit}
                                        state={btnState}
                                    >
                                        Login
                                    </Submit>
                                </div>
                                <div className="form-footer">
                                    Don't have any account? <Link to="/signup">Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;