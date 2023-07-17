import React from "react";
import { styled } from "styled-components";

const Sub2 = () => {
  return (
    <Body>
      {/* 이곳에 헤더 삽입 */}
      {/* 추후에 클래스 모두 컴포넌트로 변경 */}
      <Container>
        <VideoSection>동영상섹션</VideoSection>
        <CommentSection>
          <h3>댓글</h3>
          <div className="commentInputContainer">
            <CommentTextarea
              rows="5"
              placeholder="덧글을 입력하세요"
            ></CommentTextarea>
            <SubmitContainer>
              <PasswordInput
                type="password"
                placeholder="비밀번호 입력(4자리)"
                maxlength="4"
              ></PasswordInput>
              {/* 4글자 미만일 시 alert 발생 */}
              <Button>등록</Button>
            </SubmitContainer>
          </div>
          <div className="commentOutputContainer">
            {/* map 돌려서 덧글 모두 나오게 만들기 */}
            <CommentBox>
              <CommentTexts>이곳에 덧글 출력</CommentTexts>
              <EditBox>
                <div className="buttonBox">
                  <Button>수정</Button>
                  <Button>삭제</Button>
                </div>
                {/* 수정/삭제는 비밀번호 입력시에만 가능하도록 */}
                <form className="passwordForm">
                  <PasswordInput
                    type="password"
                    placeholder="비밀번호 입력(4자리)"
                    maxlength="4"
                  />
                  <Button type="submit">확인</Button>
                  {/* 수정/삭제 버튼 누를 경우 input 활성화 */}
                </form>
              </EditBox>
            </CommentBox>
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

const VideoSection = styled.div`
  width: 720px;
  height: 480px;
  margin: 100px auto;
  background-color: #999;
`;

const CommentSection = styled.div`
  width: 50%;
  margin: 0 auto;
`;

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

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CommentTexts = styled.p`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  border-radius: 15px;
  font-size: 18px;
  background-color: #eee;
`;

const EditBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
