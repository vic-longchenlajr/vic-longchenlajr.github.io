'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = () => {
    const pathname = usePathname();

    // Hide navbar on Lunch & Learn page to allow full immersion
    if (pathname === '/lunchandlearn' || pathname === '/presentations/lunchandlearn') return null;

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="/"></Link>
                </div>
                <ul className={styles.navLinks}>
                    <li>
                        <Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
                    </li>
                    <li>
                        <Link href="/projects" className={pathname === '/projects' ? styles.active : ''}>Projects</Link>
                    </li>
                    <li>
                        <Link href="/summary" className={pathname === '/summary' ? styles.active : ''}>Summary</Link>
                    </li>
                    <li>
                        <Link href="/presentations" className={pathname === '/presentations' ? styles.active : ''}>Presentations</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
