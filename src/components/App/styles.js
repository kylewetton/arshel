import styled from 'styled-components';
import {spacing, radius, colours, boxShadow} from '../../theme';

export const MainWrapper = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: ${spacing[10]};
`

export const Frame = styled.div`
box-shadow: ${boxShadow.md};
border: ${spacing[2]} solid ${colours.gray[200]};
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

