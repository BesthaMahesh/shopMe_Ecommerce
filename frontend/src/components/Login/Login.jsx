import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            alert("Error: " + error.message);
            console.error(error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();

            // Forces the popup to always ask the user to select an account 
            // instead of automatically logging them in with their default active browser session.
            provider.setCustomParameters({
                prompt: 'select_account'
            });

            await signInWithPopup(auth, provider);
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
                return; // User intentionally closed the popup or overlapping requests, don't show an error
            }
            alert("Error: " + error.message);
            console.error(error);
        }
    };
    return (
        <div className="min-h-screen z-50 flex py-10 justify-center items-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300 selection:bg-primary/30 px-4">
            <div
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-none w-full max-w-[440px] overflow-hidden transform transition-all duration-300 border border-gray-100 dark:border-gray-800 p-8 sm:p-10"
                data-aos="zoom-in"
                data-aos-duration="600"
            >
                {/* Content */}
                <div className="flex flex-col items-center">
                    {/* Logo / Icon - Clean Minimalist Style */}
                    <div className="w-16 h-16 bg-primary/10 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                        <svg className="w-8 h-8 text-primary drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z" /></svg>
                    </div>

                    <div className="w-full text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Welcome to ShopMe</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Sign in to unlock exclusive deals and a personalized shopping experience.</p>
                    </div>

                    {/* Form */}
                    <form className="w-full flex flex-col gap-5" onSubmit={handleEmailAuth}>
                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-gray-800 dark:text-gray-100 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                required
                            />
                        </div>
                        <div className="relative group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-gray-800 dark:text-gray-100 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                required
                            />
                        </div>

                        <div className="flex justify-between items-center text-sm mt-1 px-1">
                            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                                <input type="checkbox" className="accent-primary w-4 h-4 rounded border-gray-300" />
                                Remember me
                            </label>
                            <a href="#" className="flex-shrink-0 text-primary font-semibold hover:text-primary/80 transition-colors">Forgot Password?</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 bg-gradient-to-r from-primary to-secondary hover:scale-[1.02] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transform transition-all duration-200 active:scale-100"
                        >
                            {isSignUp ? "Create Account" : "Sign In"}
                        </button>
                    </form>

                    {/* Or Divider */}
                    <div className="w-full flex items-center gap-4 my-8">
                        <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                        <span className="text-gray-400 dark:text-gray-500 text-xs font-bold tracking-widest uppercase">Or continue with</span>
                        <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                    </div>

                    {/* Social Logins */}
                    <div className="flex justify-center w-full">
                        <button onClick={handleGoogleLogin} type="button" className="w-full flex justify-center items-center py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 group shadow-sm gap-3">
                            <FcGoogle className="text-2xl group-hover:scale-110 transition-transform" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Continue with Google</span>
                        </button>
                    </div>

                    <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-primary font-bold hover:text-primary/80 transition-colors"
                        >
                            {isSignUp ? "Sign in" : "Sign up"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
