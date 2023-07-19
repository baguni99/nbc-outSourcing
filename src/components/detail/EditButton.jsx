import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const EditButton = ({ id, currentText, onEdit }) => {
  const [editText, setEditText] = useState(currentText);

  const onClickEditButtonHandler = async () => {
    try {
      await axios.patch(`http://localhost:3001/comments/${id}`, {
        text: editText,
      });

      // 수정 완료 후 부모 컴포넌트로 수정되었다고 알려줍니다.
      onEdit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button type="button" onClick={onClickEditButtonHandler}>
      수정
    </Button>
  );
};

export default EditButton;

const Button = styled.button`
  width: 70px;
  height: 35px;
  border-radius: 18px;
  border: none;
  font-size: 16px;
  background-color: #ccc;
  cursor: pointer;
`;
