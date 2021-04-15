import styled from 'styled-components';

export default styled.div`
    height: calc(100vh - 60px);
    overflow: auto;
    background-color: var(--background);
`;

export const ItemsWrapper = styled.div`
    padding-top: 16px;
    position: relative;
    
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat( auto-fit, minmax(320px, 1fr) );
    grid-auto-rows: auto;

    background-color: var(--background);

    &::after {
        content: '';
        grid-column: 1 / -1;
        height: 48px;
    }

    &::before {
        content: '';
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 72px;
        background-image: linear-gradient(to top, var(--background), rgba(0,0,0,0));
        pointer-events: none;
    }
`;