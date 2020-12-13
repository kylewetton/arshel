import styled from 'styled-components';
import {boxShadow, spacing, colours, radius} from '../../theme';

export const InputStyled = styled.input`
    box-shadow: ${boxShadow.input};
    padding: ${spacing[1]} ${spacing[3]};
    border-radius: ${radius.sm};
    background-color: ${colours.gray[200]};
    margin: 0 ${spacing[3]};
    max-width: ${spacing[20]};
`

export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    label {
        color: ${colours.gray[400]}
    }
`

export const MainLabel = styled.label`
    flex: 1 1 0%;
`