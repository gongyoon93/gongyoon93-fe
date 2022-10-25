import { ReactNode, useLayoutEffect } from 'react';

interface ObserverProps {
  target: any;
  onIntersect: any;
  root?: any;
  rootMargin?: string;
  threshold?: number;
}

export const useObserver = ({
  target,
  onIntersect,
  root = null,
  rootMargin = '0px',
  threshold = 1.0,
}: ObserverProps) => {
  useLayoutEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold });
      observer.observe(target.current ?? target);
    }

    return () => observer && observer.disconnect();
  }, [target, rootMargin, threshold]);
};
