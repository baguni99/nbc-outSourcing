import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  font-size: 16px;
  background-color: rgb(108, 115, 104);
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  div:not(:last-child) {
    margin-right: 40px;
    margin-left: 40px;
  }
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <div>NBC</div>
        <div>introduction to our team</div>
        <div>개인정보처리방침</div>
      </FooterContent>
      <div>S E V E N S T A R S</div>
    </StyledFooter>
  );
};
