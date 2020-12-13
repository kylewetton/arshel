import styled from 'styled-components';
import {colours, radius, spacing} from '../../theme';

export const UploadArea = styled.div<{draggingOver: Boolean}>`
    background-color: ${colours.white};
    border-radius: ${radius.sm};
    padding: ${spacing[24]};
    position: relative;
    color: ${colours.rose[500]};
    text-align: center;
    * {
        position: relative;
        z-index: 2;
    }
    &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 1;
        border: 2px dashed ${({draggingOver}) => draggingOver ? colours.rose[500] : colours.rose[300]};
        border-radius: ${radius.sm};
        top: ${spacing[4]};
        left: ${spacing[4]};
        bottom: ${spacing[4]};
        right: ${spacing[4]};
        transition: border 0.25 ease-out;
    };
`