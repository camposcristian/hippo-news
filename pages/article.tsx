import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Article.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Toast, Button, ScrollToTop } from '../components';
import useLocalStorage from '../components/Hooks/useLocalStorage';

function Article(news: any) {
  const ADD_BOOKMARK = 'Add Bookmark';
  const REMOVE_BOOKMARK = 'Remove Bookmark';

  const [bookmark, setBookmark] = useLocalStorage("bookmarks",'');
  const [visible, setVisible] = useState(false);
  const [buttonText, setButtonText] = useState(ADD_BOOKMARK);

  const handleClick = () => {
    debugger;
    setVisible(true);
    // setBookmark(!bookmark);
    setButtonText(!bookmark ? REMOVE_BOOKMARK : ADD_BOOKMARK);
  };


  const iconCalendar = (
    <FontAwesomeIcon icon={faCalendarAlt} color='#3c3c3c' />
  );

  return (
    <div className='container'>
      <Head>
        <title>Hippo News | news.webTitle</title>
      </Head>

      <main>
        <article className={styles.wrapper}>
          <article className={styles.content_wrapper}>
            <Button 
            // value={`/article/${news.id}`}
            onClick={handleClick}>{buttonText}</Button>
            <p className={styles.date}>
              {iconCalendar} {news.webPublicationDate}
            </p>
            <h2>{news.webTitle}</h2>
            <h4>{news.fields.headline}</h4>
            <hr className={styles.divider} />
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: news.fields.body }}
            />
          </article>

          <article className={styles.media_wrapper}>
            {news.fields.thumbnail ? (
              <Image
                src={news.fields.thumbnail}
                alt='Article media'
                width={500}
                height={300}
              />
            ) : (
              <div className={styles.overlay}>
                <div className={styles.logo}></div>
              </div>
            )}

            <p className={styles.figcaption}>{news.fields.headline}</p>
          </article>
        </article>
      </main>

      <Toast bookmark={bookmark} visible={visible} />
      <ScrollToTop />
    </div>
  );
}



export async function getServerSideProps(query: any) {
  const baseUrl = `${process.env.GUARDIAN_API_URL}${query.query.id}?show-elements=image&show-fields=body,headline,thumbnail&api-key=${process.env.GUARDIAN_API_KEY}`;
  const res = await fetch(baseUrl);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: data.response.content };
};

export default Article;
