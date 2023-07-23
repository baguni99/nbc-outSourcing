//버튼 컴포넌트
import React, { useCallback, useEffect, useState } from 'react';
import { SortButtonsContainer, SortByOld, SortByRecent } from '../style/Style';
import TopButton from '../style/TopButton';

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

  const handleScroll = useCallback(() => {
    let timeout;
    const throttledFunc = () => {
      const { scrollY } = window;
      scrollY > 10 ? setScrollFlag(true) : setScrollFlag(false);
    };
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        throttledFunc();
      }, 100);
    }
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <SortButtonsContainer>
        <SortByRecent onClick={sortRecent}>최신순&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</SortByRecent>
        <SortByOld onClick={sortOld}>오래된순</SortByOld>
      </SortButtonsContainer>
      {scrollFlag && <TopButton isVisible={scrollFlag} />}
    </>
  );
};
export default CustomButton;
