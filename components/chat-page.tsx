import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { FC } from 'react';

export const ChatPage: FC = () => {
	return (
		<div className='flex flex-col h-screen'>
			<header className='bg-gray-900 text-white py-3 px-4 flex items-center'>
				<div className='flex items-center gap-3'>
					<Avatar className='w-8 h-8 border'>
						<AvatarImage
							alt='Avatar'
							src='/placeholder-user.jpg'
						/>
						<AvatarFallback>JD</AvatarFallback>
					</Avatar>
					<div>
						<p className='font-medium'>John Doe</p>
						<p className='text-sm text-gray-400'>Online</p>
					</div>
				</div>
			</header>
			<div className='flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800'>
				<div className='grid gap-4'>
					<div className='flex justify-end'>
						<div className='bg-blue-500 text-white rounded-lg p-3 max-w-[70%]'>
							<p>Hey there! How's it going?</p>
							<div className='text-right text-xs text-gray-300 mt-1'>3:45 PM</div>
						</div>
					</div>
					<div className='flex'>
						<div className='bg-white rounded-lg p-3 max-w-[70%] shadow'>
							<p>I'm doing great, thanks for asking!</p>
							<div className='text-right text-xs text-gray-500 mt-1'>3:46 PM</div>
						</div>
					</div>
					<div className='flex justify-end'>
						<div className='bg-blue-500 text-white rounded-lg p-3 max-w-[70%]'>
							<p>Awesome, wanna grab coffee later?</p>
							<div className='text-right text-xs text-gray-300 mt-1'>3:47 PM</div>
						</div>
					</div>
					<div className='flex'>
						<div className='bg-white rounded-lg p-3 max-w-[70%] shadow'>
							<p>Sure, that sounds great! Where do you want to meet?</p>
							<div className='text-right text-xs text-gray-500 mt-1'>3:48 PM</div>
						</div>
					</div>
					<div className='flex justify-end'>
						<div className='bg-blue-500 text-white rounded-lg p-3 max-w-[70%]'>
							<img
								alt='Image'
								className='rounded-lg mb-2 object-cover'
								height={150}
								src='/placeholder.svg'
								style={{ aspectRatio: '200/150', objectFit: 'cover' }}
								width={200}
							/>
							<div className='text-right text-xs text-gray-300 mt-1'>3:49 PM</div>
						</div>
					</div>
					<div className='flex'>
						<div className='bg-white rounded-lg p-3 max-w-[70%] shadow'>
							<div className='flex items-center gap-2'>
								<PaperclipIcon className='w-4 h-4 text-gray-500' />
								<p className='text-gray-500'>file-attachment.pdf</p>
							</div>
							<div className='text-right text-xs text-gray-500 mt-1'>3:50 PM</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-gray-100 dark:bg-gray-800 p-4'>
				<form className='flex items-center gap-2'>
					<Input
						className='flex-1 bg-white dark:bg-gray-950 dark:text-white'
						placeholder='Type your message...'
					/>
					<Button
						size='icon'
						variant='ghost'
					>
						<SendIcon className='w-5 h-5' />
					</Button>
				</form>
			</div>
		</div>
	);
};

const PaperclipIcon: FC<React.SVGProps<SVGSVGElement>> = props => {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48' />
		</svg>
	);
};

const SendIcon: FC<React.SVGProps<SVGSVGElement>> = props => {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='m22 2-7 20-4-9-9-4Z' />
			<path d='M22 2 11 13' />
		</svg>
	);
};
