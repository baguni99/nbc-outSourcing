import React from 'react';
import Chapterone from '../components/main/Chapterone';
import Chaptertwo from '../components/main/Chaptertwo';
import Chapterthree from '../components/main/Chapterthree';
import { Header } from '../components/style/Header';
import { Footer } from '../components/style/Footer';
import { StyledBody } from '../components/style/Style';

const Main = () => {
  return (
    <>
      <Header />
      <StyledBody>
        <Chapterone />
        <Chaptertwo />
        <Chapterthree />
      </StyledBody>
      <Footer />
    </>
  );
};

export default Main;
