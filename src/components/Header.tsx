import logoNanoMag from '../assets/logoNanoMag.jpg';
import logoDispCalc from '../assets/logoDispCalc.png';
import styles from './styles/Header.module.css';

interface HeaderProps {
	title: string;
}

interface ImageProps {
	src: string;
	alt: string;
}

function Image({ src, alt }: ImageProps) {
	return <img src={src} alt={alt} className={styles.img} />;
}

export default function Header({ title }: HeaderProps) {
	return (
		<header className={styles.header + ' d-flex justify-content-center'}>
			<Image src={logoDispCalc} alt="logoDispCalc" />
			<h1>{title}</h1>
			<Image src={logoNanoMag} alt="logoNanoMag" />
		</header>
	);
}
