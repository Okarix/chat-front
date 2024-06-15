'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';
import axios from 'axios';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const socket = io('http://localhost:3000');

interface Message {
	sender: string;
	receiver: string;
	message: string;
	timestamp: string;
}

interface User {
	username: string;
	online: boolean;
}

export default function ChatPage() {
	const router = useRouter();
	const [username, setUsername] = useState<string>('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [message, setMessage] = useState<string>('');
	const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
	const [currentChat, setCurrentChat] = useState<string | null>(null);
	const [typing, setTyping] = useState<string | null>(null);
	const messageEndRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const storedUsername = localStorage.getItem('username');
		if (!storedUsername) {
			router.push('/');
			return;
		}
		setUsername(storedUsername);

		socket.on('message', (msg: Message) => {
			setMessages(prevMessages => [...prevMessages, msg]);
			scrollToBottom();
		});

		socket.on('userOnline', (username: string) => {
			if (storedUsername !== username) {
				setOnlineUsers(prevUsers => {
					if (!prevUsers.some(user => user.username === username)) {
						return [...prevUsers, { username, online: true }];
					}
					return prevUsers;
				});
			}
		});

		socket.on('userOffline', (username: string) => {
			if (storedUsername !== username) {
				setOnlineUsers(prevUsers => prevUsers.filter(user => user.username !== username));
			}
		});

		socket.on('typing', (data: { username: string; isTyping: boolean }) => {
			if (data.username !== storedUsername && currentChat === data.username) {
				setTyping(data.isTyping ? data.username : null);
			}
		});

		socket.emit('join', storedUsername);

		axios.get('http://localhost:3000/users').then(response => {
			setOnlineUsers(response.data.filter((user: User) => user.username !== storedUsername));
		});

		axios.get('http://localhost:3000/messages').then(response => {
			setMessages(response.data);
		});

		return () => {
			socket.off('message');
			socket.off('userOnline');
			socket.off('userOffline');
			socket.off('typing');
		};
	}, [currentChat]);

	const handleSendMessage = () => {
		if (currentChat && message.trim()) {
			const msg: Message = { sender: username, message, timestamp: new Date().toISOString(), receiver: currentChat };
			socket.emit('message', msg);
			setMessage('');
			socket.emit('typing', { username, isTyping: false });
		}
	};

	const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
		socket.emit('typing', { username, isTyping: e.target.value.length > 0 });
	};

	const scrollToBottom = () => {
		messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className='grid grid-cols-[300px_1fr] h-[100dvh] w-full'>
			<div className='bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-auto'>
				<div className='p-4 sticky top-0 bg-gray-100 dark:bg-gray-800'>
					<Input
						className='w-full rounded-full px-4 py-2 text-sm'
						placeholder='Search conversations'
					/>
				</div>
				<div className='space-y-2 p-4'>
					{onlineUsers.map(user => (
						<div
							key={user.username}
							className={`flex items-center gap-3 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition ${currentChat === user.username ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
							onClick={() => setCurrentChat(user.username)}
						>
							<Avatar className='w-10 h-10'>
								<AvatarImage
									alt='User'
									src='/placeholder-user.jpg'
								/>
								<AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
							</Avatar>
							<div className='flex-1 truncate z-50'>
								<div className='font-medium'>{user.username}</div>
								<div className='text-sm text-gray-500 dark:text-gray-400 truncate'>{user.online ? 'Online' : 'Offline'}</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='flex flex-col'>
				<div className='border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 bg-white dark:bg-gray-950'>
					<div className='flex items-center gap-3'>
						<Avatar className='w-10 h-10'>
							<AvatarImage
								alt='User'
								src='/placeholder-user.jpg'
							/>
							<AvatarFallback>{currentChat ? currentChat.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
						</Avatar>
						<div>
							<div className='font-medium'>{currentChat}</div>
							<div className='text-sm text-gray-500 dark:text-gray-400'>{onlineUsers.find(user => user.username === currentChat)?.online ? 'Online' : 'Offline'}</div>
						</div>
					</div>
				</div>
				<div className='flex-1 overflow-auto p-4 space-y-4'>
					{messages
						.filter(msg => (msg.sender === currentChat && msg.receiver === username) || (msg.sender === username && msg.receiver === currentChat))
						.map((msg, index) => (
							<div
								key={index}
								className={`flex items-start gap-3 ${msg.sender === username ? 'justify-end' : ''}`}
							>
								{msg.sender !== username && (
									<Avatar className='w-10 h-10'>
										<AvatarImage
											alt='User'
											src='/placeholder-user.jpg'
										/>
										<AvatarFallback>{msg.sender.charAt(0).toUpperCase()}</AvatarFallback>
									</Avatar>
								)}
								<div className={`rounded-lg p-3 text-sm ${msg.sender === username ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black dark:bg-gray-800 dark:text-white'}`}>
									<div className='font-medium'>{msg.sender}</div>
									<div>{msg.message}</div>
									<div className='text-xs text-gray-500 dark:text-gray-400'>{new Date(msg.timestamp).toLocaleTimeString()}</div>
								</div>
								{msg.sender === username && (
									<Avatar className='w-10 h-10'>
										<AvatarImage
											alt='User'
											src='/placeholder-user.jpg'
										/>
										<AvatarFallback>{msg.sender.charAt(0).toUpperCase()}</AvatarFallback>
									</Avatar>
								)}
							</div>
						))}
					{typing && <div className='text-sm text-gray-500 dark:text-gray-400'>{typing} is typing...</div>}
					<div ref={messageEndRef} />
				</div>
				<div className='p-4 bg-white dark:bg-gray-950'>
					<div className='flex items-center gap-4'>
						<Textarea
							className='flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm dark:bg-gray-800'
							placeholder='Type your message...'
							value={message}
							onChange={handleTyping}
						/>
						<Button
							className='rounded-full'
							size='icon'
							variant='ghost'
							onClick={handleSendMessage}
						>
							Send
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
