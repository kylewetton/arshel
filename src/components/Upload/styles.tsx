import styled from 'styled-components';
import {colours, radius, spacing, textSize, boxShadow} from '../../theme';

export const UploadArea = styled.div<{draggingOver: boolean}>`
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

export  const LabelPill = styled.label`
background-color: ${colours.gray[200]};
cursor: pointer;
color: ${colours.rose[500]};
padding: ${spacing[2]} ${spacing[3]};
border-radius: ${radius.sm};
line-height: 1;
font-size: ${textSize.sm};
transition: transform 0.25 ease-out;
&:hover {
    box-shadow: ${boxShadow.sm};
    transform: translateY(-1px);
}
&:active {
    box-shadow: ${boxShadow.input};
    transform: translateY(0);
}
`