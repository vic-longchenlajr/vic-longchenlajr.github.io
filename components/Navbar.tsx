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
                    <li className={styles.dropdown}>
                        <Link href="/projects" className={pathname === '/projects' ? styles.active : ''}>Projects</Link>
                        <ul className={styles.dropdownMenu}>
                            <li><a href="/vortex-project-builder/" target="_blank" rel="noopener noreferrer">Vortex Project Builder</a></li>
                            <li><a href="/resource-dashboard/" target="_blank" rel="noopener noreferrer">LP Resource Dashboard</a></li>
                            <li><a href="/spray-trace/" target="_blank" rel="noopener noreferrer">SprayTrace</a></li>
                            <li><a href="/vicflex-bracket-filter/" target="_blank" rel="noopener noreferrer">VicFlex Bracket Filter</a></li>
                        </ul>
                    </li>
                    <li>
                        <Link href="/summary" className={pathname === '/summary' ? styles.active : ''}>Summary</Link>
                    </li>
                    <li className={styles.dropdown}>
                        <Link href="/presentations" className={pathname === '/presentations' ? styles.active : ''}>Presentations</Link>
                        <ul className={styles.dropdownMenu}>
                            <li><Link href="/presentations/lunchandlearn">From Workflow Friction to Validated Systems</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
