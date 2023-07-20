import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  font-size: ${(props) => (props.scrollPosition > 10 ? '30px' : '60px')};
  font-weight: bold;
  background-color: rgb(186, 208, 64);
  margin-bottom: 40px;
  padding: 5px;
  letter-spacing: 20px;
  box-shadow: 0 15px 30px -2px gray;
  width: 100%;

  top: 0;
  left: 0;
  right: 0;

  transition: font-size 0.3s ease;
`;
const StyledSubHeader = styled.header`
  font-size: ${(props) => (props.scrollPosition > 10 ? '15px' : '30px')};
  color: rgb(52, 73, 94);
`;

const RightAlignedText = styled.div`
  text-align: right;
  line-height: 2;
  letter-spacing: 40px;
`;
export const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const navigate = useNavigate();
  const goToMain = () => {
    navigate('main');
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    const handleResize = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <StyledHeader scrollPosition={scrollPosition}>
      <StyledSubHeader scrollPosition={scrollPosition}>서바이벌|자취|상식</StyledSubHeader>
      <RightAlignedText onClick={goToMain}>
        자취방에서&nbsp;&nbsp;&nbsp;
        <br /> 살아남기
      </RightAlignedText>
    </StyledHeader>
  );
};
