import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Bookmarks.module.scss';


function Bookmarks() {

  return (
    <div className='container'>
      <Head>
        <title>Bookmarks</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.heading}>
          <h1>Bookmarks</h1>
          <div className={styles.toolkit}>

          </div>
        </div>
      </main>

      <div className={styles.empty}>
        <div className={styles.icon}></div>
        <h2>Hey!</h2>
        <h4>Start to add some bookmarks!</h4>
      </div>
    </div>
  );
}

export default Bookmarks;
