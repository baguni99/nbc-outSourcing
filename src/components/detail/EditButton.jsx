import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const EditButton = ({ id, currentText, onEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [editText, setEditText] = useState(currentText);

  const onClickEditButtonHandler = () => {
    setShowModal(true);
  };

  const onSaveChangesHandler = async () => {
    try {
      await axios.patch(`http://localhost:3001/comments/${id}`, {
        text: editText
      });

      onEdit(id, editText);
      setShowModal(false);
      window.alert('저장되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  const onCancelHandler = () => {
    setShowModal(false);
    window.alert('저장이 취소되었습니다.');
    window.location.reload();
  };

  return (
    <>
      <Button type="button" onClick={onClickEditButtonHandler}>
        수정
      </Button>

      {showModal && (
        <ModalContainer>
          <Modal>
            <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
            <SaveButton onClick={onSaveChangesHandler}>저장</SaveButton>
            <CancelButton onClick={onCancelHandler}>취소</CancelButton>
          </Modal>
        </ModalContainer>
      )}
    </>
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

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 300px;

  textarea {
    width: 100%;
    height: 150px;
    resize: none;
    margin-bottom: 10px;
  }
`;

const SaveButton = styled.button`
  width: 70px;
  height: 35px;
  border-radius: 18px;
  border: none;
  font-size: 16px;
  background-color: #ccc;
  cursor: pointer;
`;

const CancelButton = styled.button`
  width: 70px;
  height: 35px;
  border-radius: 18px;
  border: none;
  font-size: 16px;
  background-color: #ccc;
  cursor: pointer;
  margin: 10px;
`;
