import logo from '../assets/logo.jpg';
import styles from './Header.module.css';

interface HeaderProps {
	title: string;
}

export default function Header({ title }: HeaderProps) {
	return (
		<header className={styles.header + ' d-flex justify-content-center'}>
			<img src={logo} alt="logo" className={styles.img} />
			<h1>{title}</h1>
		</header>
	);
}
