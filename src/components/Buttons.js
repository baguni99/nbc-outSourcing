//버튼 컴포넌트
import React, { useState } from 'react';
import { SortByOld, SortByRecent } from './Style';
const CustomButton = ({ sortMethod }) => {
  const sortOld = () => {
    sortMethod('old');
  };
  const sortRecent = () => {
    sortMethod('recent');
  };
  return (
    <>
      <SortByRecent onClick={sortRecent}>최신순</SortByRecent>
      <SortByOld onClick={sortOld}>오래된순</SortByOld>
    </>
  );
};
export default CustomButton;
