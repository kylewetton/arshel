import styled from 'styled-components';
import {spacing, colours, boxShadow, textSize} from '../../theme';

export const ControlPanelWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: ${spacing[10]};
    font-size: ${textSize.sm};
    box-shadow: ${boxShadow.xlTop};
    background-color: ${colours.white};
`

export const InputGroup = styled.div`

`

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`