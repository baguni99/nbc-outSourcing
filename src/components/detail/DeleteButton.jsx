import React from 'react';
import axios from 'axios';
import styled from 'styled-components'; // styled-components를 import합니다.

const DeleteButton = ({ id, onDelete }) => {
  const onClickDeleteButtonHandler = async () => {
    try {
      await axios.delete(`http://localhost:3001/comments/${id}`);
      onDelete(); // 삭제 후 상태를 업데이트하기 위해 onDelete 함수를 호출합니다.
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <StyledButton type="button" onClick={onClickDeleteButtonHandler}>
      삭제
    </StyledButton>
  );
};

export default DeleteButton;

const StyledButton = styled.button`
  width: 70px;
  height: 35px;
  border-radius: 18px;
  border: none;
  font-size: 16px;
  background-color: #ccc;
  cursor: pointer;

  &:nth-of-type(2) {
    margin-left: 10px;
  }
`;
