import styled from 'styled-components';
import {colours, spacing, textSize} from '../../theme';

export const Loader = styled.div`
    position: absolute;
    top: 0; left: 0;
    bottom: 0; right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    padding: ${spacing[10]};

    p {
        background-color: ${colours.green[500]};
        position: absolute;
        top: 0;
        width: 100%;
        text-align: center;
        color: ${colours.green[100]};
        padding: ${spacing[3]};
        font-size: ${textSize.sm}
    } 
    p:after {
        content: '';
        display: block;
        height: 3px;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        background: ${colours.green[700]};
        z-index: 5;
        animation: load 3s ease-in 0s forwards;
    }

    @keyframes load {
        from {
            width: 0%;
        }
        to {
            width: 100%;
        }
    }
`