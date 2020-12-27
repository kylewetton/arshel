import styled from 'styled-components';
import {colours, spacing, textSize} from '../../theme'; 

export const Logo = styled.img`
    height: ${spacing[8]};
    width:auto;
    margin-bottom: ${spacing[2]};
`

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    p {
        font-size: ${textSize.xs};
        color: ${colours.gray[400]};
        text-align: center;
        font-weight: 500;
    }
`