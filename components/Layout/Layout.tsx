import { useCallback, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Loader from "react-loader-spinner";
import {
  Header,
  Footer,
  Card,
  Button,
  ScrollToTop,
} from '../index';
import styles from './Layout.module.scss';
import useSearch from '../Hooks/useSearch';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function Layout({
  children
}: any) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { news, hasMore, loading, error } = useSearch(
    searchTerm,
    page,
  );
  const observer = useRef<IntersectionObserver>();
  const mountedRef = useRef(true);

  const lastNewsElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer?.current) observer?.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleReset = useCallback(async () => {
    setSearchTerm('');
  }, [mountedRef]);

  useEffect(() => {
    handleReset();
    return () => {
      mountedRef.current = false;
    };
  }, [handleReset]);

  const searchCards = (content: any, bgColor: any) => {
    return (
      <div>
        {
          content.map((item: any, idx: any) => {
            return (
              <div
                key={idx}
              >
                <h2>{item.sectionName}</h2>
                <section className={styles.grid_wrap}>
                  <div className={styles.grid}>
                    {item.news.map((item: any, idx: any) => {
                      return (
                        <Link
                          key={idx}
                          href={{
                            pathname: '/article/',
                            query: { id: item.id },
                          }}
                        >
                          <a
                            onClick={handleReset}
                            ref={
                              content.length === idx + 1 && content.length >= 15
                                ? lastNewsElementRef
                                : null
                            }
                          >
                            <Card
                              webTitle={item.webTitle}
                              headline={item.fields.headline}
                              thumbnail={item.fields.thumbnail}
                              bgColor={bgColor}
                            />
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              </div>
            );
          })
        }
      </div>
    );
  };

  const getContent = () => {
    if ((!loading && !news?.length) || error) {
      return (
        <div className={styles.empty}>
          <div className={styles.icon}></div>
          <h2>Sorry!</h2>
          <h4>The requested info is not available</h4>
        </div>
      );
    }
    return (
      <main className={styles.main}>
        <div className={styles.heading}>
          <h1>Search Results</h1>
          <div className={styles.toolkit}>
            <Button
              onClick={() => {
                router.push('/bookmarks');
                setSearchTerm('');
              }}
            >
              Bookmarks
            </Button>
          </div>
        </div>

        {searchCards(news, '#d32f2f')}

        {loading && (
          <div className={styles.loading}>
            <Loader
              type="MutatingDots"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        )}
      </main>
    );
  };

  const searchResult = () => {
    return (
      <div className='container'>
        {getContent()}

        <ScrollToTop />
      </div>
    );
  };

  return (
    <div className='content'>
      <Header
        onChange={handleSearch}
        searchTerm={searchTerm}
        onClick={handleReset}
      />
      {!searchTerm ? children : searchResult()}
      <Footer />
    </div>
  );
}

export default Layout;
