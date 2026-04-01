'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = () => {
    const pathname = usePathname();

    // Hide navbar on Lunch & Learn page to allow full immersion
    if (
      pathname === "/presentations/lunchandlearn" ||
      pathname === "/presentations/ai-user-group-session-2"
    )
      return null;

    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/"></Link>
          </div>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/" className={pathname === "/" ? styles.active : ""}>
                Home
              </Link>
            </li>
            <li className={styles.dropdown}>
              <Link
                href="/projects"
                className={pathname === "/projects" ? styles.active : ""}
              >
                Projects
              </Link>
              <ul className={styles.dropdownMenu}>
                <li>
                  <a
                    href="/vortex-project-builder/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vortex Project Builder
                  </a>
                </li>
                <li>
                  <a
                    href="/resource-dashboard/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LP Resource Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/spray-trace/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SprayTrace
                  </a>
                </li>
                <li>
                  <a
                    href="/product-request-pipeline/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Product Request Pipeline
                  </a>
                </li>

                <li>
                  <a
                    href="/vicflex-bracket-filter/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    VicFlex Bracket Filter
                  </a>
                </li>
              </ul>
            </li>
            <li className={styles.dropdown}>
              <Link
                href="/documentation"
                className={
                  pathname.startsWith("/documentation") ? styles.active : ""
                }
              >
                Documentation
              </Link>
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link href="/documentation/summary">Summary</Link>
                </li>
                <li>
                  <Link href="/documentation/bestpractices">
                    Best Practices
                  </Link>
                </li>
              </ul>
            </li>
            <li className={styles.dropdown}>
              <Link
                href="/presentations"
                className={pathname === "/presentations" ? styles.active : ""}
              >
                Presentations
              </Link>
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link href="/presentations/ai-user-group-session-2">
                    AI User Group Session 2
                  </Link>
                </li>
                <li>
                  <Link href="/presentations/lunchandlearn">
                    From Workflow Friction to Validated Systems
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
};

export default Navbar;
