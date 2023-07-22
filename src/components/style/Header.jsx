import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../firebase';

export const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const goToMain = () => {
    navigate('/');
  };

  // 로그인 상태 감지
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

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

  //---로그아웃 클릭시 사용자 로그아웃 처리 + 홈화면으로 이동---
  const onLogOutClick = () => {
    auth.signOut();
    navigate('/');
    alert('로그아웃되었습니다.');
  };

  return (
    <StyledHeader isFixed={isFixed}>
      <StyledSubHeader isFixed={isFixed}>서바이벌|자취|상식</StyledSubHeader>
      <StBtns>
        {/* 로그인 버튼 또는 로그아웃 버튼 */}
        {!isLoggedIn ? (
          // 로그인하지 않은 경우
          <Link to="/login">
            <StButton className="login-btn">Login</StButton>
          </Link>
        ) : (
          // 로그인한 경우
          <StButton className="logout-btn" onClick={onLogOutClick}>
            Logout
          </StButton>
        )}
      </StBtns>
      <RightAlignedText onClick={goToMain}>
        자취방에서&nbsp;&nbsp;&nbsp;
        <br /> 살아남기
      </RightAlignedText>
    </StyledHeader>
  );
};

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

const StBtns = styled.div`
  margin-top: 12px;
  display: flex;
  margin-right: 15px;
  justify-content: flex-end;
`;

const StButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 25px;
  margin-right: 15px;
  cursor: pointer;
`;
