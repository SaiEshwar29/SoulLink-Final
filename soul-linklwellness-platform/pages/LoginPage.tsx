
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormState, UserRole } from '../types';
import Logo from '../components/Logo';
import { useUser } from '../hooks/useUser';
import { supabase } from '../components/supabaseClient'; // <--- ADD THIS LINE

// To satisfy TypeScript, as 'lucide' is loaded from a script tag
declare const lucide: any;

const FormHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <p className="text-slate-500 mt-2">{subtitle}</p>
    </div>
);

const RoleSelector: React.FC<{ selectedRole: UserRole; onRoleChange: (role: UserRole) => void }> = ({ selectedRole, onRoleChange }) => (
    <div className="grid grid-cols-2 gap-4 my-6">
        <div>
            <input 
                type="radio" 
                id="student" 
                name="role" 
                value={UserRole.STUDENT} 
                className="hidden peer" 
                checked={selectedRole === UserRole.STUDENT} 
                onChange={() => onRoleChange(UserRole.STUDENT)}
            />
            <label htmlFor="student" className="block w-full text-center p-3 border border-slate-300 rounded-lg cursor-pointer text-slate-700 peer-checked:bg-sky-100 peer-checked:border-sky-500 peer-checked:text-sky-700 font-medium transition-colors">
                Student
            </label>
        </div>
        <div>
            <input 
                type="radio" 
                id="admin" 
                name="role" 
                value={UserRole.ADMIN} 
                className="hidden peer" 
                checked={selectedRole === UserRole.ADMIN} 
                onChange={() => onRoleChange(UserRole.ADMIN)}
            />
            <label htmlFor="admin" className="block w-full text-center p-3 border border-slate-300 rounded-lg cursor-pointer text-slate-700 peer-checked:bg-sky-100 peer-checked:border-sky-500 peer-checked:text-sky-700 font-medium transition-colors">
                Admin
            </label>
        </div>
    </div>
);

const LoginPage: React.FC = () => {
    const [formState, setFormState] = useState<FormState>(FormState.LOGIN);
    const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
    const navigate = useNavigate();
    const { setUser } = useUser();

    useEffect(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, [formState]);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulate fetching and setting user data on login
        setUser({
            name: 'Alex Thompson',
            email: 'student@example.com',
            pronouns: 'He/Him',
            major: 'Computer Science',
        });
        if (role === UserRole.ADMIN) {
            navigate('/admin');
        } else {
            navigate('/dashboard');
        }
    };

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;

        setUser({
            name: fullName || 'New Student',
            email: email || 'new.student@example.com',
            pronouns: 'Not specified',
            major: 'Not specified',
        });

        if (role === UserRole.ADMIN) {
            // In a real app, admin creation might have a different flow
            navigate('/admin');
        } else {
            navigate('/onboarding');
        }
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Password reset link sent!');
        setFormState(FormState.LOGIN);
    };

    const renderForm = useCallback(() => {
        const inputClasses = "w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500";
        switch (formState) {
            case FormState.LOGIN:
                return (
                    <div id="login-form" className="animate-fade-in">
                        <FormHeader title="Welcome to SoulLink" subtitle="Sign in to your account" />
                        <form className="mt-8" onSubmit={handleLogin}>
                            <RoleSelector selectedRole={role} onRoleChange={setRole} />
                            <div className="space-y-6">
                                <input name="email" className={inputClasses} type="email" placeholder="Email" required />
                                <input name="password" className={inputClasses} type="password" placeholder="Password" required />
                            </div>
                            
                            <div className={`transition-all duration-300 ease-in-out grid ${role === UserRole.ADMIN ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <input
                                        id="faculty-id-login"
                                        className={inputClasses}
                                        type="text"
                                        placeholder="Faculty ID"
                                        aria-hidden={role !== UserRole.ADMIN}
                                        required={role === UserRole.ADMIN}
                                        tabIndex={role !== UserRole.ADMIN ? -1 : 0}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end items-center text-sm mt-4">
                                <a href="#" onClick={(e) => { e.preventDefault(); setFormState(FormState.FORGOT_PASSWORD); }} className="font-medium text-sky-600 hover:text-sky-500">Forgot Password?</a>
                            </div>
                            <button type="submit" className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition-colors mt-6">Login</button>
                            <p className="text-center text-sm text-slate-500 mt-6">
                                Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setFormState(FormState.SIGNUP); }} className="font-medium text-sky-600 hover:text-sky-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                );
            case FormState.SIGNUP:
                return (
                    <div id="signup-form" className="animate-fade-in">
                        <FormHeader title="Create an Account" subtitle="Join SoulLink today" />
                        <form className="mt-8" onSubmit={handleSignup}>
                            <RoleSelector selectedRole={role} onRoleChange={setRole} />
                            <div className="space-y-6">
                                <input name="fullName" className={inputClasses} type="text" placeholder="Full Name" required />
                                <input name="email" className={inputClasses} type="email" placeholder="Email" required />
                                <input name="password" className={inputClasses} type="password" placeholder="Password" required />
                                <input className={inputClasses} type="password" placeholder="Confirm Password" required />
                            </div>

                             <div className={`transition-all duration-300 ease-in-out grid ${role === UserRole.ADMIN ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <input
                                        id="faculty-id-signup"
                                        className={inputClasses}
                                        type="text"
                                        placeholder="Faculty ID"
                                        aria-hidden={role !== UserRole.ADMIN}
                                        required={role === UserRole.ADMIN}
                                        tabIndex={role !== UserRole.ADMIN ? -1 : 0}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition-colors mt-8">Create Account</button>
                            <p className="text-center text-sm text-slate-500 mt-6">
                                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setFormState(FormState.LOGIN); }} className="font-medium text-sky-600 hover:text-sky-500">Login</a>
                            </p>
                        </form>
                    </div>
                );
            case FormState.FORGOT_PASSWORD:
                return (
                    <div id="forgot-password-form" className="animate-fade-in">
                        <FormHeader title="Forgot Password" subtitle="Enter your email to reset your password" />
                        <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
                            <input className={inputClasses} type="email" placeholder="Email" required />
                            <button type="submit" className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition-colors">Send Reset Link</button>
                            <p className="text-center text-sm text-slate-500">
                                <a href="#" onClick={(e) => { e.preventDefault(); setFormState(FormState.LOGIN); }} className="font-medium text-sky-600 hover:text-sky-500">Back to Login</a>
                            </p>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    }, [formState, role, navigate, setUser]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
             <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
            <div className="max-w-md w-full mx-auto">
                <div className="flex justify-center mb-8">
                    <Logo />
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    {renderForm()}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;