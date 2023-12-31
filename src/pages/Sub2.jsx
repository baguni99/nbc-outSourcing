import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import VideoSec from '../components/detail/VideoSec';
import CommentInput from '../components/detail/CommentInput';
import DeleteButton from '../components/detail/DeleteButton';
import EditButton from '../components/detail/EditButton';
import { Header } from '../components/style/Header';
import { Footer } from '../components/style/Footer';
import TopButton from '../components/style/TopButton';
import { useParams } from 'react-router-dom';

const StyledContainer = styled.div`
  margin-top: ${({ headerHeight }) => (headerHeight > 10 ? `${headerHeight}px` : '0')};
`;

const Sub2 = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const { id } = useParams();

  const getComments = useCallback(async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/comments', {
        params: {
          videoId: id
        }
      });
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  const onConfirmPasswordHandler = async (password, commentId) => {
    const commentToCheck = comments.find((comment) => comment.id === commentId);
    if (commentToCheck && commentToCheck.password === password) {
      setIsPasswordVerified(true);
      setCurrentCommentId(commentId);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
      setIsPasswordVerified(false);
      setCurrentCommentId(null);
    }
  };

  const onEditCommentHandler = async (commentId, newText) => {
    try {
      await axios.patch(`http://localhost:3001/comments/${commentId}`, {
        text: newText
      });
      getComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Body>
      <Header />
      <Container>
        <StyledContainer>
          <VideoSec videoId={id} />
          <CommentSection>
            <h3>댓글</h3>
            <CommentInput getComments={getComments} id={id} onConfirmPassword={onConfirmPasswordHandler} />
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
                    </EditCommentBox>
                    <EditButtonContainer>
                      <div className="buttonBox">
                        <EditButton
                          id={comment.id}
                          currentText={comment.text}
                          onEdit={onEditCommentHandler}
                          isPasswordVerified={isPasswordVerified}
                          currentCommentId={currentCommentId}
                        />
                        <DeleteButton id={comment.id} onDelete={getComments} />
                      </div>
                      <PasswordInputContainer>
                        <PasswordInput
                          type="password"
                          placeholder="기존 비밀번호 입력(4자리)"
                          maxLength="4"
                          autoComplete="0000"
                          onChange={(e) => setCheckPassword(e.target.value)}
                        />
                        <Button type="button" onClick={() => onConfirmPasswordHandler(checkPassword, comment.id)}>
                          확인
                        </Button>
                      </PasswordInputContainer>
                    </EditButtonContainer>
                  </EditBox>
                </CommentBox>
              ))}
            </div>
          </CommentSection>
        </StyledContainer>
      </Container>
      <Footer />
      <TopButton />
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
  align-items: center;
  width: 100%;
`;

const PasswordInputContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
