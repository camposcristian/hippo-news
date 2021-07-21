import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

function useSearch(searchTerm: any, page: any) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useMemo(() => {
    if (!searchTerm) return;
    setNews([]);
  }, [searchTerm]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: any;
    axios({
      method: 'GET',
      url: `/api/getNews`,
      params: {
        page: page,
        'page-size': 15,
        q: searchTerm,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setNews((prevNews) => {
          return [...new Set([...prevNews, ...res.data])];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [searchTerm, page]);

  return { loading, error, news, hasMore };
}

export default useSearch;
