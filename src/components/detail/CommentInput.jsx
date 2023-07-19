import React, { useState } from "react";
import { styled } from "styled-components";
import axios from "axios";

const CommentInput = ({ getComments }) => {
  const [password, setPassword] = useState("");
  const [commentText, setCommentText] = useState("");

  const onClickSubmitButton = async () => {
    if (password.length < 4) {
      alert("비밀번호를 4글자로 입력해 주세요!");
    } else {
      try {
        const newComment = {
          videoid: 1,
          password,
          text: commentText,
        };

        await axios.post("http://localhost:3001/comments", newComment);
        setCommentText("");
        setPassword("");

        await getComments();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form
      className="commentInputContainer"
      onSubmit={(e) => {
        e.preventDefault();
        onClickSubmitButton();
      }}
    >
      <CommentTextarea
        rows="5"
        placeholder="덧글을 입력하세요"
        value={commentText}
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
      ></CommentTextarea>
      <SubmitContainer>
        <PasswordInput
          type="password"
          placeholder="비밀번호 입력(4자리)"
          maxLength="4"
          autoComplete="0000"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></PasswordInput>
        {/* 4글자 미만일 시 alert 발생 */}
        <Button>등록</Button>
      </SubmitContainer>
    </form>
  );
};

export default CommentInput;

const CommentTextarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  resize: none;
`;

const SubmitContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 10px 0 50px;

  & > button {
    width: 100px;
    height: 40px;
    border-radius: 20px;
  }
`;

const PasswordInput = styled.input`
  width: 150px;
  height: 35px;
  padding: 0 5px;
  margin-right: 10px;
`;

const Button = styled.button`
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
