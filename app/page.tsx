'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AuthPage() {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isRegistering, setIsRegistering] = useState<boolean>(false);

	const handleLogin = async () => {
		try {
			const response = await axios.post('http://localhost:3000/login', { username, password });
			if (response.status === 200) {
				localStorage.setItem('username', username);
				window.location.href = '/chats';
			} else {
				console.error('Login failed:', response);
			}
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	const handleRegister = async () => {
		try {
			const response = await axios.post('http://localhost:3000/register', { username, password });
			if (response.status === 201) {
				setIsRegistering(false);
			} else {
				console.error('Registration failed:', response);
			}
		} catch (error) {
			console.error('Registration failed:', error);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			{isRegistering ? (
				<div className='flex flex-col items-center'>
					<Input
						className='mb-2 p-2 border rounded text-white'
						value={username}
						onChange={e => setUsername(e.target.value)}
						placeholder='Username'
					/>
					<Input
						className='mb-2 p-2 border rounded text-white'
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder='Password'
						type='password'
					/>
					<Button
						className='p-2 bg-green-500 text-white rounded'
						onClick={handleRegister}
					>
						Register
					</Button>
					<Button
						className='mt-2 text-blue-500'
						onClick={() => setIsRegistering(false)}
					>
						Back to Login
					</Button>
				</div>
			) : (
				<div className='flex flex-col items-center'>
					<Input
						className='mb-2 p-2 border rounded text-white'
						value={username}
						onChange={e => setUsername(e.target.value)}
						placeholder='Username'
					/>
					<Input
						className='mb-2 p-2 border rounded text-white'
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder='Password'
						type='password'
					/>
					<Button
						className='p-2 bg-blue-500 text-white rounded'
						onClick={handleLogin}
					>
						Login
					</Button>
					<Button
						className='mt-2 text-blue-500'
						onClick={() => setIsRegistering(true)}
					>
						Register
					</Button>
				</div>
			)}
		</div>
	);
}
