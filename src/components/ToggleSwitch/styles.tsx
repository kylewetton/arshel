import styled from 'styled-components';
import {colours} from '../../theme';

export const ToggleLabel = styled.label`
transform: translateX(-10px);
  span span {
    display: none;
  }
  display: inline-block;
  height: 18px;
  position: relative;
  overflow: visible;
  padding: 0;
  margin-left: 50px;
  cursor: pointer;
  width: 40px;

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  label, > span {
    line-height: 20px;
    height: 20px;
    vertical-align: middle;
  }

  input:focus ~ a, input:focus + label {
    outline: none;
  }

  label {
    position: relative;
    z-index: 3;
    display: block;
    width: 100%;
  }

  input {
    position: absolute;
    opacity: 0;
    z-index: 5;
  }

  > span {
    position: absolute;
    left: -50px;
    width: 100%;
    margin: 0;
    padding-right: 50px;
    text-align: left;
    white-space: nowrap;
  }
  > span span {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    display: block;
    width: 50%;
    margin-left: 50px;
    text-align: left;
    font-size: 0.8em;
    width: 100%;
    left: 15%;
    top: -2px;
    opacity: 0;
  }
  i {
    position: absolute;
    right: 50%;
    z-index: 4;
    display: block;
    height: 16px;
    padding: 0;
    left: 2px;
    width: 16px;
    background-color: #fff;
    border: 1px solid ${colours.gray[250]};
    border-radius: 100%;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  > span span:first-of-type {
    color: ${colours.gray[400]};
    opacity: 1;
    left: 45%;
  }
  > span:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50px;
    top: -2px;
    background-color: ${colours.gray[200]};
    border: 1px solid ${colours.gray[200]};
    border-radius: 30px;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
  }
  input:checked ~ i {
    border-color: #fff;
    left: 100%;
    margin-left: -8px;
  }
  input:checked ~ span:before {
    border-color: ${colours.rose[500]};
    box-shadow: inset 0 0 0 30px ${colours.rose[500]};
  }
  input:checked ~ span span:first-of-type {
    opacity: 0;
  }
  input:checked ~ span span:last-of-type {
    opacity: 1;
    color: #fff;
  }
`