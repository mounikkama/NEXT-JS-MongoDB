"use client"; 

import React, { useState } from "react";
import Link from 'next/link';

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("user");
    const [message, setMessage] = useState("");

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setMessage("Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.");
            return;
        }

        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                password,
                email,
                firstName,
                lastName,
                role,
            }),
        });

        const data = await response.json();
        setMessage(data.message || data.error);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            {message && <p className="text-center mb-4">{message}</p>}
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <select
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Register</button>
            <p className="text-center mt-4">
                Already have an account?
                <Link href="/login" legacyBehavior>
                    <a className="text-blue-500">Sign In</a>
                </Link>
            </p>
        </form>
    );
}
