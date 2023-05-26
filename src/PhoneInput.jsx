import { func, string } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import ReactSelect, { components } from 'react-select';
import Flag from 'react-world-flags';
import styled, { keyframes } from 'styled-components';
import countries from './countries';
const IndicatorSeparator = () => null;
const animation = keyframes`
	0% {
		opacity: 0.1;
		transform: scale(0.6);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
`;
const StyledMenu = styled.div`
   & .react-select-menu {
      animation: ${animation} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      background-color: rgb(255, 255, 255);
      border-radius: 8px;
      border: none;
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
      margin: 0;
      overflow: hidden;
      padding: 0;
      transform-origin: top;
   }
`;
const StyledOption = styled.div`
   align-items: center;
   border-radius: 7px;
   display: flex;
   height: 40px;
   padding: 0 13px;
   width: 100%;
   &:hover {
      background-color: rgba(82, 85, 241, 0.1);
      &[data-selected='true'] {
         background-color: #5254f1;
      }
      &[data-disabled='true'] {
         background-color: rgb(247, 248, 252);
      }
   }
   & .name {
      font-size: 16px;
      font-weight: 500;
      overflow: hidden;
      padding: 11px 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: calc(100% - 34px);
   }
   & .flag {
      align-items: center;
      display: flex;
      height: 24px;
      justify-content: center;
      margin: 0 10px 0 0;
      min-width: 24px;
      width: 24px;
      & img {
         max-height: 24px;
         max-width: 24px;
      }
   }
`;
const StyledSingleValue = styled.div`
   align-items: center;
   display: flex;
   & .name {
      font-size: 16px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: calc(100% - 34px);
   }
   & .flag {
      align-items: center;
      display: flex;
      height: 24px;
      justify-content: center;
      margin: 0 10px 0 0;
      min-width: 24px;
      width: 24px;
      & img {
         max-height: 24px;
         max-width: 24px;
      }
   }
`;
const Menu = props => (
   <StyledMenu>
      <components.Menu {...props} className='react-select-menu'>
         {props?.children}
      </components.Menu>
   </StyledMenu>
);
const Option = ({
   children,
   data,
   innerProps,
   isDisabled,
   isFocused,
   isSelected,
}) => {
   const ref = useRef(null);
   const code = (String(data?.iso) || '').toLowerCase();
   useEffect(() => {
      if (isSelected) {
         ref.current.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
   }, [isSelected]);
   return isDisabled ? null : (
      <StyledOption
         {...innerProps}
         data-disabled={isDisabled}
         data-selected={isSelected}
         ref={ref}
         style={{
            backgroundColor: isDisabled
               ? 'rgb(247, 248, 252)'
               : isSelected
               ? '#5254f1'
               : isFocused
               ? 'rgba(82, 85, 241, 0.1)'
               : 'rgb(255, 255, 255)',
            color: isDisabled
               ? 'rgb(105, 111, 133)'
               : isSelected
               ? 'rgb(255, 255, 255)'
               : isFocused
               ? 'rgb(37, 42, 59)'
               : 'rgb(37, 42, 59)',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
         }}
      >
         <div className='flag'>
            <Flag code={code} />
         </div>
         <div className='name'>{children}</div>
      </StyledOption>
   );
};
const SingleValue = ({ data }) => (
   <StyledSingleValue>
      <div className='flag'>
         <Flag code={(String(data?.value) || '').toLowerCase()} />
      </div>
      <div className='name'>{data?.value}</div>
   </StyledSingleValue>
);
const options = {
   components: { IndicatorSeparator, Menu, Option, SingleValue },
   isClearable: false,
   isMulti: false,
   isSearchable: false,
   maxMenuHeight: 230,
   menuShouldScrollIntoView: true,
   placeholder: 'Select',
   styles: {
      container: styles => ({
         ...styles,
         height: '100%',
         width: 100,
      }),
      control: (styles, { isFocused }) => ({
         ...styles,
         backgroundColor: 'transparent',
         border: isFocused
            ? '1.5px solid #5254f1'
            : '1.5px solid rgb(226, 228, 234)',
         borderRadius: '8px 0 0 8px',
         boxShadow: 'none',
         color: 'rgb(37, 42, 59)',
         cursor: 'pointer',
         height: 44,
         justifyContent: 'flex-start',
         minHeight: 40,
         minWidth: 'initial',
         outline: 'none',
         padding: 0,
         width: '100%',
         ':hover': {
            border: isFocused
               ? '1.5px solid #5254f1'
               : '1.5px solid rgb(226, 228, 234)',
         },
      }),
      valueContainer: styles => ({
         ...styles,
         display: 'flex',
         flex: 'initial',
         height: '100%',
         padding: '9px 4px 9px 12px',
         whiteSpace: 'nowrap',
         input: {
            height: 0,
            opacity: 0,
            width: 0,
         },
      }),
      singleValue: (styles, { data }) => ({
         ...styles,
         color: data?.isDisabled ? 'rgb(105, 111, 133)' : 'rgb(37, 42, 59)',
         fontSize: 15,
         fontWeight: 500,
         margin: 0,
      }),
      menuList: styles => ({
         ...styles,
         padding: 5,
         '::-webkit-scrollbar': {
            padding: '0 5px 0 0',
            width: 6,
         },
         '::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
         },
         '::-webkit-scrollbar-thumb': {
            backgroundColor: '#5254f1',
            borderRadius: 3,
         },
      }),
      menuPortal: styles => ({
         ...styles,
         left: 0,
         position: 'absolute',
         top: 44,
         width: '100%',
         zIndex: 99,
      }),
      indicatorsContainer: styles => ({ ...styles, padding: 0 }),
      dropdownIndicator: (styles, { selectProps }) => ({
         ...styles,
         alignItems: 'center',
         color: '#000000',
         display: 'flex',
         height: 24,
         justifyContent: 'center',
         margin: 0,
         padding: 0,
         transform: `rotate(${selectProps?.menuIsOpen ? '180deg' : 0})`,
         transformOrigin: 'center',
         transition: '0.4s transform',
         svg: {
            width: 18,
         },
         ':hover': {
            color: '#000000',
         },
      }),
      placeholder: styles => ({
         ...styles,
         color: 'rgb(105, 111, 133)',
         margin: 0,
      }),
   },
};
const Select = props => <ReactSelect {...options} {...props} />;
const StyledElement = styled.div`
   display: flex;
   height: 44px;
   position: relative;
   width: 100%;
   z-index: 3;
   & * {
      box-sizing: border-box;
   }
   & .phone-input {
      border-color: rgb(217, 219, 225);
      border-radius: 0 8px 8px 0;
      border-style: solid;
      border-width: 1.5px 1.5px 1.5px 0;
      font-size: 17px;
      font-weight: 500;
      height: 100%;
      outline: none;
      padding: 0 0 0 12px;
      position: relative;
      width: calc(100% - 100px);
      &:focus {
         border-color: #5254f1;
         border-width: 1.5px;
         margin: 0 0 0 -1.5px;
      }
   }
`;
const createMask = country => {
   const countryMask = country?.mask || '';
   const prefixMask = country?.code || '+##########';
   const countryMaskArray = Array.isArray(countryMask) ? countryMask : [];
   const countArray = countryMaskArray.map(mask => {
      const length = mask
         .replace(/\(/g, '')
         .replace(/\)/g, '')
         .replace(/-/g, '').length;
      return length;
   });
   const suffixMask = Array.isArray(countryMask)
      ? '#'.repeat(Math.max(...countArray, 0))
      : typeof countryMask === 'string'
      ? countryMask.replace(/-/g, ' ')
      : '';
   const mask = prefixMask + (suffixMask ? ' ' + suffixMask : '');
   return mask;
};
const PhoneInput = ({ value, onChange }) => {
   const ref = useRef(null);
   const [country, setCountry] = useState(null);
   const options = countries.map(country => ({
      ...country,
      label: country?.name,
      value: country?.iso,
   }));
   const option = country
      ? { ...country, value: country?.iso, label: country?.name }
      : null;
   useEffect(() => {
      setCountry(undefined);
   }, []);
   return (
      <StyledElement ref={ref}>
         <Select
            menuPortalTarget={ref.current}
            onChange={setCountry}
            options={options}
            value={option}
         />
         <ReactInputMask
            alwaysShowMask
            className='phone-input'
            formatChars={{ '#': '[0-9]' }}
            mask={createMask(country)}
            maskChar=''
            onChange={e => {
               const value = e?.target?.value
                  .replace(/-/g, '')
                  .replace(/\(/g, '')
                  .replace(/\)/g, '')
                  .replace(/\+/g, '')
                  .replace(/\s/g, '');
               onChange(value);
            }}
            type='phone'
            value={value}
         />
      </StyledElement>
   );
};
PhoneInput.defaultProps = {
   value: '',
};
PhoneInput.propTypes = {
   onChange: func.isRequired,
   value: string.isRequired,
};
export default PhoneInput;
