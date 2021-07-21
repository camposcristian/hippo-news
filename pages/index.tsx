import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  ScrollToTop,
} from '../components';
import styles from '../styles/Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHippo } from '@fortawesome/free-solid-svg-icons';

function Home(props: any) {
  const router = useRouter();

  return (
    <div className='container'>
      <Head>
        <title>Hippo News</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.heading}>
          <div className={styles.empty}>
            <FontAwesomeIcon  icon={faHippo} size='8x' color='#3c3c3c' />
            <h2>Hungry for news?</h2>
            {/* <h4>We could not find what you were looking for.</h4> */}
          </div>
        </div>
      </main>

      <ScrollToTop />
    </div>
  );
}

export default Home;