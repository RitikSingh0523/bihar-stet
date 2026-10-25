import { useEffect, useState } from 'react';

const parse = () => (window.location.hash.replace(/^#\/?/, '') || 'home').split('/');

export function useHashRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => setRoute(parse());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export const go = (path) => { window.location.hash = `/${path}`; };
