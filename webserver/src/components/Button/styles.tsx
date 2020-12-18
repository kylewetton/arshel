import styled from 'styled-components';
import {radius, spacing, colours, textSize, boxShadow} from '../../theme';

export const Pill = styled.button<{tier: 'primary' | 'secondary' | 'loading' | 'completed'}>`
    background-color: ${({tier}) =>
        tier === 'primary' ?
        colours.rose[500] :
        tier === 'loading' ?
        colours.gray[200] :
        tier === 'completed' ?
        colours.green[100] :
        colours.gray[200]};
    color: ${({tier}) =>
    tier === 'primary' ?
    colours.white :
    tier === 'loading' ?
    colours.gray[300] :
    tier === 'completed' ?
    colours.green[500] :
    colours.rose[500]}};

    padding: ${spacing[2]} ${spacing[3]};
    border-radius: ${radius.sm};
    line-height: 1;
    font-size: ${textSize.sm};
    transition: transform 0.25 ease-out;
    &:hover {
        box-shadow: ${boxShadow.sm};
        transform: translateY(-1px);
    }
`