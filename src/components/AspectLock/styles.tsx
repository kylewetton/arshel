import styled from 'styled-components';
import { colours, radius, spacing } from '../../theme';

export const LockButton = styled.button`
    outline: none;
    background: ${colours.gray[200]};
    border-radius: ${radius.md};
    padding: ${spacing[1]};
    transform: translateY(-100%);
    &:focus {
        outline: none;
    }
    &:before, &:after {
        content: '';
        display: block;
        position: absolute;
        height: 15px;
        width: 10px;
        left: 10px;
        border-left: 2px solid ${colours.gray[200]};
        
    }

    &:before {
        top: -15px;
        border-top: 2px solid ${colours.gray[200]};
        border-radius: 3px 0 0 0;
    }
    &:after {
        bottom: -15px;
        border-bottom: 2px solid ${colours.gray[200]};
        border-radius: 0 0 0 3px;
    }
`