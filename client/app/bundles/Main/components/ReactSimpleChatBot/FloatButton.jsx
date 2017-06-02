import styled from 'styled-components';

const FloatButton = styled.a`
  align-items: center;
  cursor: pointer;
  background: ${props => props.headerBgColor};
  bottom: 32px;
  border-radius: 100%;
  box-shadow: 0 0 24px 0 rgba(93,202,136, 0.8);
  display: flex;
  fill: ${props => props.headerFontColor};
  height: 56px;
  justify-content: center;
  position: fixed;
  right: 32px;
  transform: ${props => props.opened ? 'scale(0)' : 'scale(1)'};
  transition: transform .3s ease;
  width: 56px;
  z-index: 999;

  ${''/* -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1); */}

  -webkit-animation: ${props => !props.opened ? 'pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1)' : 'webkit-animation: none'};
  -moz-animation: ${props => !props.opened ? 'pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1)' : 'moz-animation: none'};
  -ms-animation: ${props => !props.opened ? 'pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1)' : 'ms-animation: none'};
  -animation: ${props => !props.opened ? 'pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1)' : 'animation: none'};

  ${''/* this:hover  {
    -webkit-animation: none;-moz-animation: none;-ms-animation: none;animation: none;
}git  */}

  @-webkit-keyframes pulse{box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
  @-moz-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
  @-ms-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
  @keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
`;


export default FloatButton;
