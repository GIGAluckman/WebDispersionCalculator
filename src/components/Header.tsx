import logoNanoMag from '../assets/logoNanoMag.jpg';
import logoDispCalc from '../assets/logoDispCalc.png';
import styles from './styles/Header.module.css';

interface HeaderProps {
	title: string;
}

export default function Header({ title }: HeaderProps) {
	return (
		<header className={styles.header + ' d-flex justify-content-center'}>
			<img src={logoDispCalc} alt="logoDispCalc" className={styles.img} />
			<h1>{title}</h1>
			<img src={logoNanoMag} alt="logoNanoMag" className={styles.img} />
		</header>
	);
}
