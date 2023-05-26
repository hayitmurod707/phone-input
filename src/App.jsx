import { useState } from 'react';
import styled from 'styled-components';
import PhoneInput from './PhoneInput';
import './style.css';
const StyledElement = styled.div`
   align-items: center;
   display: flex;
   flex-direction: column;
   height: 100vh;
   justify-content: center;
   width: 100%;
   & .content {
      width: 350px;
   }
`;
const App = () => {
   const [value, setValue] = useState('');
   return (
      <StyledElement>
         <h1 style={{ textAlign: 'center' }}>Phone input component</h1>
         <h4 style={{ textAlign: 'center' }}>
            <a href='https://github.com/hayitmurod707/phone-input'>Github</a>
         </h4>
         <div className='content'>
            <PhoneInput value={value} onChange={setValue} />
         </div>
      </StyledElement>
   );
};
export default App;
