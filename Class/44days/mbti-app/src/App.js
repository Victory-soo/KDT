import styled from 'styled-components';
import './App.css';
import GlobalStyle from './components/GlobalStyle';
import Start from './components/Start';

const Main = styled.main`
  box-sizing: border-box;
  padding: 35px;
  width: 100%;
  max-width: 600px;
  margin: auto;
  text-align: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <Start />
      </Main>
    </>
  );
}

export default App;
