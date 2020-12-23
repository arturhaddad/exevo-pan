import styled from 'styled-components';

export default styled.div`
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 4px;
    background-color: var(--surface);
    user-select: none;

    .sort-icon {
        width: 37px;
        height: 37px;
        opacity: 0.55;
    }

    .paginating-wrapper {
        text-align: right;

        .cursor-wrapper {
            margin-top: 8px;
            display: flex;
            
            > *:not(:last-child) {
                margin-right: 16px;
            }

            .cursor {
                padding: 0;
                height: 32px;
                cursor: pointer;
                outline: none;

                svg {
                    width: 32px;
                    fill: var(--onSurface);
                    opacity: 0.55;
                }

                &.disabled {
                    pointer-events: none;

                    svg {
                        fill: var(--separator);
                    }
                }

                

                &.mirror svg {
                    transform: rotate(180deg);
                }
            }
        }

        .tracker {
            display: block;
            font-size: 12px;
            font-weight: 300;
            letter-spacing: 0.5px;
        }
    }
`;