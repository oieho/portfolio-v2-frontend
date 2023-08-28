/* eslint-disable react-hooks/rules-of-hooks */
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { MyInfo } from '../../App';
const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RightBlock = styled.div`
  position: relative;
  background: #f5f5f5;
  left: 30.65rem;
  width: 16.625rem;
  height: 10rem;
  top: 0;
`;

const Description = styled.div`
  position: absolute;
  top: -15.55rem;
  background: #f5f5f5;
  border-radius: 1rem;
  width: 100%;
  height: 35.67rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DescriptionTop = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 1.25rem;
`;
const NowLoading = styled.span`
  position: absolute;
  top: 7.97rem;
  font-size: 0.85rem;
`;

const Confirmpwtit = styled.img`
  position: relative;
  top: 4.8rem;
  z-index: 0;
`;
const InputTitles = styled.ul`
  position: absolute;
  text-align: right;
  left: -1.29rem;
  top: 9.47rem;
  list-style: none;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 3.306rem;
  z-index: 2;
`;
const UserIdTit = styled.li``;
const UserEmailTit = styled.li``;
const UserNameTit = styled.li``;
const ProviderTit = styled.li``;
const Inputs = styled.ul`
  position: absolute;
  list-style: none;
  padding: 0;
  top: 9.5rem;
  left: 0.55rem;
`;
const InputLi = styled.li`
  height: 3.33rem;
`;

const IdInput = styled.input`
  position: absolute;
  width: 15.5rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem 0.4rem 0.4rem 4.6rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;

  &:focus {
    font-weight: bold;
  }
`;

const EmailInput = styled.input`
  position: absolute;
  width: 15.5rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem 0.4rem 0.4rem 4.6rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;

  &:focus {
    font-weight: bold;
    border: solid 0.11rem #000000;
  }
`;
const UserNameInput = styled.input`
  position: absolute;
  width: 15.5rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem 0.4rem 0.4rem 4.6rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;

  &:focus {
    font-weight: bold;
    border: solid 0.11rem #000000;
  }
`;

interface Props {
  readonly myInfo: MyInfo | null;
  readonly isLoading: boolean;
}

const MemberInfo = ({ myInfo, isLoading }: Props) => {
  const [boardRegDateDays, setBoardRegDateDays] = useState('');
  useEffect(() => {
    const convertDateForm = (boards: any) => {
      const year = boards[0];
      const month =
        boards[1] < 10 ? boards[1].toString().padStart(2, '0') : boards[1];
      const date =
        boards[2] < 10 ? boards[2].toString().padStart(2, '0') : boards[2];
      const hours =
        boards[3] < 10 ? boards[3].toString().padStart(2, '0') : boards[3];
      var minutes =
        boards[4] < 10 ? boards[4].toString().padStart(2, '0') : boards[4];
      var seconds =
        boards[5] < 10 ? boards[5].toString().padStart(2, '0') : boards[5];
      if (typeof boards[5] === 'undefined') {
        seconds = '00';
      } else if (typeof boards[4] === 'undefined') {
        minutes = '00';
      }
      return (
        year +
        '-' +
        month +
        '-' +
        date +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds
      );
    };
    if (myInfo) {
      setBoardRegDateDays(convertDateForm(myInfo?.regDate));
    }
  }, [myInfo, myInfo?.regDate]);
  return (
    <Wrapper>
      <RightBlock>
        <Description>
          <Confirmpwtit
            src={process.env.PUBLIC_URL + '/images/memberinfotit.png'}
            alt="Member Information"
          />
          {isLoading && <NowLoading>로딩 중...</NowLoading>}
          {!isLoading && myInfo && (
            <DescriptionTop>
              <InputTitles>
                <UserIdTit>아이디</UserIdTit>
                <UserEmailTit>이메일</UserEmailTit>
                <UserNameTit>이름</UserNameTit>
                <ProviderTit>소셜가입</ProviderTit>
                <ProviderTit>가입일자</ProviderTit>
              </InputTitles>
              <Inputs>
                <InputLi>
                  <IdInput
                    maxLength={10}
                    name="userId"
                    value={myInfo.userId}
                    disabled
                  />
                </InputLi>
                <InputLi>
                  <EmailInput
                    maxLength={30}
                    name="userEmail"
                    type="text"
                    value={myInfo.userEmail}
                    disabled
                  />
                </InputLi>
                <InputLi>
                  <UserNameInput
                    maxLength={30}
                    name="userName"
                    type="text"
                    value={myInfo.userName}
                    disabled
                  />
                </InputLi>
                <InputLi>
                  <UserNameInput
                    maxLength={30}
                    name="provider"
                    type="text"
                    value={myInfo.providerType}
                    disabled
                  />
                </InputLi>
                <InputLi>
                  <UserNameInput
                    maxLength={30}
                    name="provider"
                    type="text"
                    value={boardRegDateDays}
                    disabled
                  />
                </InputLi>
              </Inputs>
            </DescriptionTop>
          )}
        </Description>
      </RightBlock>
    </Wrapper>
  );
};

export default MemberInfo;
