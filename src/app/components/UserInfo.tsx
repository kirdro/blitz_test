import styles from '@/src/app/styles/Home.module.css';
import { LogoutButton } from '@/src/app/(auth)/components/LogoutButton';
import Link from 'next/link';
import { FC } from 'react';
import { IUser } from '@/src/intefaces';

export const UserInfo:FC<{user: IUser | null}> = ({user}) => {
	return (
		<div className={styles.buttonContainer}>
			{user ? (
				<>
					<LogoutButton />
					<div>
						User id: <code>{user.id}</code>
						<br />
						User role: <code>{user.role}</code>
					</div>
				</>
			) : (
				<>
					<Link href="/signup" className={styles.button}>
						<strong>Sign Up</strong>
					</Link>
					<Link href="/login" className={styles.loginButton}>
						<strong>Login</strong>
					</Link>
				</>
			)}
		</div>
	);
};