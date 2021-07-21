import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.back();
    }, 3000);
  }, []);

  return (
    <div className='not-found container'>
      <h2>Page Not Found</h2>
      <h4>Sorry! The page requested doesnt exist</h4>
      <p>
         Back to {' '}
        <Link href='/'>
          <a>Home page</a>
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
