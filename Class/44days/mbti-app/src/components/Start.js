import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import OrangeButton from './OrangeButton';
import { next } from '../store/modules/mbti';

const Header = styled.p`
  font-size: 3em;
`;

const MainImg = styled.img`
  width: inherit;
`;

const SubHeader = styled.p`
  font-size: 1.5em;
  color: #777;
`;

export default function Start() {
  const dispatch = useDispatch();
  return (
    <>
      <Header>개발자 MBTI 설문조사</Header>
      <MainImg src="/images/main.jpg" alt="main_image" />
      <SubHeader>MBTI를 알아내보자.</SubHeader>
      <OrangeButton
        text="Start !"
        clickEvent={() => dispatch(next())}
      ></OrangeButton>
    </>
  );
}
