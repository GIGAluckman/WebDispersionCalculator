import logoNanoMag from '../assets/logoNanoMag.jpg';
import logoDispCalc from '../assets/logoDispCalc.png';
import logoTetraX from '../assets/logoTetrax.png';
import styles from './styles/Header.module.css';

interface HeaderProps {
	title: string;
}

interface ImageProps {
	src: string;
	alt: string;
	height?: string;
}

function Image({ src, alt, height }: ImageProps) {
	return (
		<img
			src={src}
			alt={alt}
			className={styles.img}
			style={{ height: height }}
		/>
	);
}

export default function Header({ title }: HeaderProps) {
	return (
		<header className={styles.header + ' d-flex justify-content-center'}>
			<Image src={logoDispCalc} alt="logoDispCalc" />
			<h1 className={styles.title}>{title}</h1>
			<a
				href="https://nanomag.univie.ac.at"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image src={logoNanoMag} alt="logoNanoMag" height="60px" />
			</a>
			<a
				href="https://www.tetrax.software"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image src={logoTetraX} alt="logoTetraX" height="45px" />
			</a>
		</header>
	);
}
