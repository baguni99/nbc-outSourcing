import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  z-index: 1000;
  font-size: ${(props) => (props.isFixed ? '30px' : '60px')};
  font-weight: bold;
  background-color: rgb(205, 217, 199);
  margin-bottom: 40px;
  padding: ${(props) => (props.isFixed ? '5px 20px' : '5px')};
  letter-spacing: ${(props) => (props.isFixed ? '10px' : '20px')};
  border-bottom: 2px solid gray;
  width: 100%;
  position: ${(props) => (props.isFixed ? 'fixed' : 'relative')};
  top: 0;
  left: 0;
  right: 0;

  transition: font-size 0.3s ease;
`;

const StyledSubHeader = styled.header`
  font-size: ${(props) => (props.isFixed ? '15px' : '30px')};
  color: rgb(52, 73, 94);
`;

const RightAlignedText = styled.div`
  text-align: right;
  line-height: 2;
  letter-spacing: 40px;
`;
export const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/');
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
    const handleHeaderFix = () => {
      if (scrollPosition > headerHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();
    handleHeaderFix();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollPosition, headerHeight]);
  return (
    <StyledHeader isFixed={isFixed}>
      <StyledSubHeader isFixed={isFixed}>서바이벌|자취|상식</StyledSubHeader>
      <RightAlignedText onClick={goToMain}>
        자취방에서&nbsp;&nbsp;&nbsp;
        <br /> 살아남기
      </RightAlignedText>
    </StyledHeader>
  );
};
