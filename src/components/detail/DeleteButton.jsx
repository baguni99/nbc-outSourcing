import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

// DeleteButton component
const DeleteButton = ({ id, onDelete, isPasswordVerified, currentCommentId }) => {
  const onClickDeleteButtonHandler = async () => {
    if (!isPasswordVerified || currentCommentId !== id) {
      alert('비밀번호를 확인해 주세요!');
      return;
    }

    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/comments/${id}`);
        onDelete();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return <StyledButton onClick={onClickDeleteButtonHandler}>삭제</StyledButton>;
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
