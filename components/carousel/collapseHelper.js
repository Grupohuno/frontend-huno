import { keyframes } from "styled-components";

export const expandCards = (cardWidth, gap, index) => keyframes`
  0% {
    opacity: ${index === 0 ? 1 : 0.5};
    transform: translateX(-${(cardWidth - gap) * index}px);
  }
  100% {
    opacity: 1;
    /* transform: translateX(0); */
  }
`;

export const collapseCards = (cardWidth, gap, index) => keyframes`
  0% {
    opacity: 1;
    /* transform: translateX(0); */
  }
  100% {
    opacity: ${index === 0 ? 1 : 0.5};
    transform: translateX(-${(cardWidth - gap) * index}px);
  }
`;
