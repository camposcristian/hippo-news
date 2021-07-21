import styles from './Header.module.scss';
import { useRouter } from 'next/router';
import { SearchBar } from '../index';

function Header(props: any) {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.search}>
          <SearchBar {...props} />
        </div>
      </div>
    </header>
  );
}

export default Header;
