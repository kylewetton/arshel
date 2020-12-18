import styled from 'styled-components';
import {textSize, colours} from '../../theme';

export const FooterSignoff = styled.p`
    font-size: ${textSize.sm};
    color: ${colours.gray[300]};
    a {
        color: ${colours.gray[400]};
        text-decoration: underline;
        transition: color 0.5s ease-out;
    }
    a:hover {
        color: ${colours.rose[500]};
    }
`