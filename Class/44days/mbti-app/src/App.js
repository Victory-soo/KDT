import styled from 'styled-components';
import './App.css';
import GlobalStyle from './components/GlobalStyle';
import Start from './components/Start';
import { useSelector } from 'react-redux';
import Mbti from './components/Mbti';

const Main = styled.main`
  box-sizing: border-box;
  padding: 35px;
  width: 100%;
  max-width: 600px;
  margin: auto;
  text-align: center;
`;

function App() {
  const page = useSelector((state) => state.mbti.page);

  return (
    <>
      <GlobalStyle />
      <Main>{page === 0 ? <Start /> : <Mbti />}</Main>
    </>
  );
}

export default App;
