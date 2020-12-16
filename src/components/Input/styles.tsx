import styled from 'styled-components';
import {spacing, colours, radius, textSize} from '../../theme';

export const InputStyled = styled.input`
    padding: ${spacing[1]} ${spacing[3]};
    border-radius: ${radius.sm};
    background-color: ${colours.gray[200]};
    margin: 0 ${spacing[2]} 0 ${spacing[6]};
    max-width: ${spacing[20]};
`

export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${spacing[4]};
    label {
        color: ${colours.gray[400]};
        font-size: ${textSize.xs};
        font-weight: medium;
    }
`

export const MainLabel = styled.label`
    flex: 1 1 0%;
    color: ${colours.rose[500]} !important;
    font-size: ${textSize.xs};
    font-weight: medium;
`