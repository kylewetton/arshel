import styled from 'styled-components';
import {spacing, colours, boxShadow, textSize} from '../../theme';

export const ControlPanelWrapper = styled.div`
    position: fixed;
    top: 100vh;
    right: 0;
    left: 0;
    bottom: 0;
    font-size: ${textSize.sm};
    box-shadow: ${boxShadow.xlTop};
    background-color: ${colours.white};
    width: 100%;
    z-index: 9999;
    animation: slideUp 0.75s ease-out 0.5s forwards;

    &.completed {
       top: auto;
       animation: none;
    }

    @media (min-width: 768px) {
        max-width: 340px;
        left: auto;
        top: 0;
        height: 100%;
        animation: none;
        &.completed {
            top: 0;
        }
    }

    @keyframes slideUp {
        from {
            top: 100vh;
        }

        to {
            top: 50vh;
        }
    }
`

export const ScrollTrack = styled.div`
    width: 100%;
    padding: ${spacing[10]};
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    justify-content: space-between;
    align-items: flex-start;
    overflow-y: auto;
    &.completed {
     display: none;
    }
        @media (min-width: 768px) {
        &.completed {
            display: flex;
        }
    }
`


export const InputGroup = styled.div`
    margin-bottom: ${spacing[16]};
    h2 {
        font-size: ${textSize.xs};
        font-weight: bold;
        color: ${colours.gray[500]};
        margin-bottom: ${spacing[10]};
        text-transform: uppercase;
    }
`

export const ButtonWrapper = styled.div`
    padding: ${spacing[10]};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-shadow: ${boxShadow.xlTop};
`

export const PanelPositioning = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`