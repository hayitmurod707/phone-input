import { useState } from 'react';
import styled from 'styled-components';
import PhoneInput from './PhoneInput';
import './style.css';
const StyledElement = styled.div`
   align-items: center;
   display: flex;
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
         <div className='content'>
            <PhoneInput value={value} onChange={setValue} />
         </div>
      </StyledElement>
   );
};
export default App;
