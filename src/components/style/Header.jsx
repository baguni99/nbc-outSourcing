import React, { useEffect, useState } from 'react';
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
  position: fixed;
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
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <StyledHeader scrollPosition={scrollPosition}>
      <StyledSubHeader scrollPosition={scrollPosition}>서바이벌|자취|상식</StyledSubHeader>
      <RightAlignedText>
        자취방에서&nbsp;&nbsp;&nbsp;
        <br /> 살아남기
      </RightAlignedText>
    </StyledHeader>
  );
};
