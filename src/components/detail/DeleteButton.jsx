import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DeleteButton = ({ id, onDelete }) => {
  const onClickDeleteButtonHandler = () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      // 사용자가 확인을 선택한 경우에만 삭제 요청을 보냅니다.
      deleteComment();
    }
  };

  const deleteComment = async () => {
    try {
      await axios.delete(`http://localhost:3001/comments/${id}`);
      onDelete();
    } catch (error) {
      console.error(error);
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
