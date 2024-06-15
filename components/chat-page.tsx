import { Input } from '@/components/ui/input';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ChatPage() {
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
					<Link
						className='flex items-center gap-3 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition'
						href='#'
					>
						<Avatar className='w-10 h-10'>
							<AvatarImage
								alt='User'
								src='/placeholder-user.jpg'
							/>
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div className='flex-1 truncate'>
							<div className='font-medium'>John Doe</div>
							<div className='text-sm text-gray-500 dark:text-gray-400 truncate'>Hey, how's it going?</div>
						</div>
						<div className='text-sm text-gray-500 dark:text-gray-400'>2:30 PM</div>
					</Link>
					<Link
						className='flex items-center gap-3 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition'
						href='#'
					>
						<Avatar className='w-10 h-10'>
							<AvatarImage
								alt='User'
								src='/placeholder-user.jpg'
							/>
							<AvatarFallback>JS</AvatarFallback>
						</Avatar>
						<div className='flex-1 truncate'>
							<div className='font-medium'>Jane Smith</div>
							<div className='text-sm text-gray-500 dark:text-gray-400 truncate'>Did you see the new design?</div>
						</div>
						<div className='text-sm text-gray-500 dark:text-gray-400'>1:45 PM</div>
					</Link>
					<Link
						className='flex items-center gap-3 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition'
						href='#'
					>
						<Avatar className='w-10 h-10'>
							<AvatarImage
								alt='User'
								src='/placeholder-user.jpg'
							/>
							<AvatarFallback>BJ</AvatarFallback>
						</Avatar>
						<div className='flex-1 truncate'>
							<div className='font-medium'>Bob Johnson</div>
							<div className='text-sm text-gray-500 dark:text-gray-400 truncate'>Let's discuss the project timeline.</div>
						</div>
						<div className='text-sm text-gray-500 dark:text-gray-400'>11:20 AM</div>
					</Link>
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
							<AvatarFallback>JS</AvatarFallback>
						</Avatar>
						<div>
							<div className='font-medium'>Jane Smith</div>
							<div className='text-sm text-gray-500 dark:text-gray-400'>Online</div>
						</div>
					</div>
				</div>
				<div className='flex-1 overflow-auto p-4 space-y-4'>
					<div className='flex items-start gap-3'>
						<Avatar className='w-10 h-10'>
							<AvatarImage
								alt='User'
								src='/placeholder-user.jpg'
							/>
							<AvatarFallback>JS</AvatarFallback>
						</Avatar>
						<div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[70%]'>
							<div className='font-medium'>Jane Smith</div>
							<div className='text-sm'>Hey, how's it going?</div>
							<div className='text-xs text-gray-500 dark:text-gray-400 mt-1'>2:30 PM</div>
						</div>
					</div>
					<div className='flex items-start gap-3 justify-end'>
						<div className='bg-blue-500 text-white rounded-lg p-3 max-w-[70%]'>
							<div className='font-medium'>You</div>
							<div className='text-sm'>Pretty good, thanks for asking!</div>
							<div className='text-xs text-gray-300 mt-1'>2:31 PM</div>
						</div>
						<Avatar className='w-10 h-10'>
							<AvatarImage
								alt='User'
								src='/placeholder-user.jpg'
							/>
							<AvatarFallback>YO</AvatarFallback>
						</Avatar>
					</div>
					<div className='flex items-start gap-3'>
						<Avatar className='w-10 h-10'>
							<AvatarImage
								alt='User'
								src='/placeholder-user.jpg'
							/>
							<AvatarFallback>JS</AvatarFallback>
						</Avatar>
						<div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[70%]'>
							<div className='font-medium'>Jane Smith</div>
							<div className='text-sm'>That's great to hear! I was wondering if you had a chance to look at the new design I sent over.</div>
							<div className='text-xs text-gray-500 dark:text-gray-400 mt-1'>2:32 PM</div>
						</div>
					</div>
					<div className='flex items-start gap-3 justify-end'>
						<div className='bg-blue-500 text-white rounded-lg p-3 max-w-[70%]'>
							<div className='font-medium'>You</div>
							<div className='text-sm'>Yes, I took a look and I really like the new design. Great work!</div>
							<div className='text-xs text-gray-300 mt-1'>2:33 PM</div>
						</div>
						<Avatar className='w-10 h-10'>
							<AvatarImage
								alt='User'
								src='/placeholder-user.jpg'
							/>
							<AvatarFallback>YO</AvatarFallback>
						</Avatar>
					</div>
				</div>
				<div className='border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-950'>
					<div className='relative'>
						<Textarea
							className='w-full rounded-full px-4 py-2 pr-16 text-sm'
							placeholder='Type your message...'
							rows={1}
						/>
						<Button
							className='absolute top-1/2 right-3 -translate-y-1/2'
							size='icon'
							type='submit'
							variant='ghost'
						>
							<SendIcon className='w-5 h-5' />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
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
}
