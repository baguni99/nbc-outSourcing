import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import VideoSec from '../components/detail/VideoSec';
import CommentInput from '../components/detail/CommentInput';
import DeleteButton from '../components/detail/DeleteButton';
import EditButton from '../components/detail/EditButton';
import { Header } from '../components/style/Header';

const Sub2 = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const getComments = async () => {
    const { data } = await axios.get('http://localhost:3001/comments');
    setComments(data);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Body>
      <Header />
      {/* 추후에 클래스 모두 컴포넌트로 변경 */}
      <Container>
        <VideoSec />
        <CommentSection>
          <h3>댓글</h3>
          <CommentInput getComments={getComments} />
          <div className="commentOutputContainer">
            {comments?.map((comment) => (
              <CommentBox key={comment.id}>
                <CommentTexts>{comment.text}</CommentTexts>
                <EditBox>
                  <EditCommentBox>
                    <CommentTextarea
                      rows="4"
                      placeholder={comment.text}
                      value={commentText}
                      onChange={(e) => {
                        setCommentText(e.target.value);
                      }}
                    />
                    <div>
                      <PasswordInput
                        type="password"
                        placeholder="비밀번호 입력(4자리)"
                        maxLength="4"
                        autoComplete="0000"
                      />
                      <Button>완료</Button>
                    </div>
                  </EditCommentBox>
                  {/* EditCommentBox는 수정 버튼 활성시에만 보입니다 */}
                  <EditButtonContainer>
                    {/* 비밀번호 검증 후에는 잠시 안 보이게 */}
                    <div className="buttonBox">
                      <EditButton id={comment.id} currentText={comment.text} onEdit={getComments} />
                      <DeleteButton id={comment.id} onDelete={getComments} />
                    </div>
                    {/* 수정/삭제는 비밀번호 입력시에만 가능하도록 */}
                    <PasswordInputContainer>
                      <PasswordInput
                        type="password"
                        placeholder="비밀번호 입력(4자리)"
                        maxLength="4"
                        autoComplete="0000"
                      />
                      <Button type="submit">확인</Button>
                    </PasswordInputContainer>
                    {/* 위는 삭제 버튼 누를 경우에만 활성화 */}
                  </EditButtonContainer>
                </EditBox>
              </CommentBox>
            ))}
          </div>
        </CommentSection>
      </Container>
    </Body>
  );
};

export default Sub2;

const Body = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const CommentSection = styled.div`
  width: 50%;
  margin: 0 auto;
  padding-bottom: 100px;
`;

const CommentTextarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  resize: none;
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

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 30px;
`;

const CommentTexts = styled.p`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  border-radius: 15px;
  font-size: 18px;
  background-color: #eee;
`;

const EditBox = styled.form`
  width: 100%;
`;

const EditCommentBox = styled.div`
  display: none;
  // 기본 값은 none, 수정 시에 block으로 보이게 함
  align-items: center;
  width: 100%;

  & > textarea {
    margin: 10px 0;
  }

  & > div {
    text-align: right;

    & > button {
      width: 100px;
      height: 40px;
      margin-left: 10px;
    }
  }
`;

const EditButtonContainer = styled.div`
  position: relative;
  // 수정 시에 잠시 display none 됐다가 수정 이후 block으로 다시 변경
  align-items: center;
  width: 100%;
`;

const PasswordInputContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  /* display: none; */
  // 기본값: none, 삭제버튼 누르면 block처리
`;
