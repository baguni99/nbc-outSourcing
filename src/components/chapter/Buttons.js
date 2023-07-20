//버튼 컴포넌트
import React, { useEffect, useState } from 'react';
import { GoToTop, SortByOld, SortByRecent, WatchMore } from '../style/Style';

function throttle(func, wait) {
  let timeout;
  return function () {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, arguments);
      }, wait);
    }
  };
}
const CustomButton = ({ sortMethod }) => {
  const sortOld = () => {
    sortMethod('old');
  };
  const sortRecent = () => {
    sortMethod('recent');
  };

  const [scrollFlag, setScrollFlag] = useState(false);

  const updateScroll = () => {
    const { scrollY } = window;
    scrollY > 10 ? setScrollFlag(true) : setScrollFlag(false);
  };
  const handleScroll = throttle(updateScroll, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const goToTop = () => (document.documentElement.scrollTop = 0);

  return (
    <>
      <SortByRecent onClick={sortRecent}>최신순&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</SortByRecent>
      <SortByOld onClick={sortOld}>오래된순</SortByOld>
      {scrollFlag && (
        <GoToTop onClick={goToTop}>
          <img src="/asset/top.png" alt="scroll top" />
        </GoToTop>
      )}
    </>
  );
};
export default CustomButton;
