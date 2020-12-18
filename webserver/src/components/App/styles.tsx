import styled from 'styled-components';
import {spacing, radius, boxShadow} from '../../theme';

export const MainWrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: ${spacing[10]};
`

export const Frame = styled.div<{frameColor: string; includeFrame: boolean}>`
box-shadow: ${boxShadow.md};
${({includeFrame, frameColor}) => includeFrame ?
    `border: ${spacing[2]} solid ${frameColor};`
    : ''}
border-radius: ${radius.sm};
position: relative;
&:before {
    content: '';
    display: block;
    box-shadow: ${boxShadow.inner};
    position: absolute;
    top: 0; left: 0;
    bottom: 0; right: 0;
    pointer-events: none;
    z-index: 10;
}
`

