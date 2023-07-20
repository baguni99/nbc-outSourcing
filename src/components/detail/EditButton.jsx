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
      // 코멘트를 수정하기 위해 패치 요청을 보냅니다.
      // 수정된 텍스트를 사용합니다.
      await axios.patch(`http://localhost:3001/comments/${id}`, {
        text: editText
      });

      // 수정 완료 후 부모 컴포넌트로 수정되었다고 알려줍니다.
      onEdit(editText); // 수정된 텍스트를 인자로 전달합니다.
      setShowModal(false); // 모달을 닫습니다.
    } catch (error) {
      console.error(error);
    }
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
            <CancelButton onClick={() => setShowModal(false)}>취소</CancelButton>
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
    padding: 5px;
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
`;
