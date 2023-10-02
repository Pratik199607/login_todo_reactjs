import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = ({ setIsLoggedIn }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const API_URL = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${API_URL}/api/login`, {
				email,
				password,
			});
			console.log(response.data);
			// Save the token in local storage
			localStorage.setItem("token", response.data.token);
			localStorage.setItem('userId', response.data.userId);
			

			//Handle success login
			setSuccess(response.data.message);
			setTimeout(() => {
				setIsLoggedIn(true);
				navigate("/todo")
			}, 2000);
			// navigate("/todo");
			setError("");
			
			// window.location.href = '/todo';
		} catch (error) {
			console.error(error);
			setError("Invalid email or password");
			setSuccess("");
		}
	};

	return (
		<div className="mx-auto container max-w-xl text-center my-14 bg-slate-200 rounded-3xl">
			<h2 className="text-2xl pt-8 text-purple-700">Login</h2>
			<form className="flex flex-col h-3/5 pt-5" onSubmit={handleSubmit}>
				<label className="block">
					<span className="block text-md font-medium text-slate-70">
						Email:
					</span>
					<input
						className="peer placeholder:italic placeholder:text-slate-400 border border-s-purple-950 bg-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
						type="email"
						value={email}
						placeholder="abc@gmail.com"
						onChange={(e) => setEmail(e.target.value)}
						required
						pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
					/>
					<p className="mt-2 invisible peer-invalid:visible text-purple-600 text-sm">
						Please provide a valid email address.
					</p>
				</label>
				<label className="block">
					<span className="block text-md font-medium text-slate-70">
						Password:
					</span>
					<input
						className="peer placeholder:italic placeholder:text-slate-400 border border-s-purple-950 bg-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
						type="password"
						value={password}
						placeholder="dummypasswd"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<p className="mt-2 invisible peer-invalid:visible text-purple-600 text-sm">
						Please enter a password
					</p>
				</label>
				<div>
					<button
						className="px-4 mt-3 py-2 rounded-lg bg-purple-900/50 w-1/6 align-middle"
						type="submit"
					>
						Login
					</button>
				</div>
			</form>

			{success && (
				<div className="bg-green-500/80 text-white mt-7 rounded-lg py-2 h-1/12 w-56 inline-block relative">
					{success}
				</div>
			)}
			{error && (
				<div className="bg-red-500/80 text-white mt-7 rounded-lg py-2 h-1/12 w-56 inline-block relative">
					{error}
				</div>
			)}
		</div>
	);
};

export default Login;
