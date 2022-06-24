import React, {
    useState,
    useEffect,
    useRef,
    Children,
    cloneElement,
    createRef
  } from "react";
  import PropTypes from "prop-types";
  import styles from "../../styles/Carousel.module.scss";
  import ArrowNavigator from "./arrowNav";
  import styled from "styled-components";
  import scrollTo from "./scrollHelper";
  import { collapseCards, expandCards } from "./collapseHelper";
  const Carousel = ({
    children,
    stepSize,
    cardDist,
    navOnTop,
    navTitle,
    collapse,
    splitIndex
  }) => {
    const viewport = useRef(null);
    const cardRefs = useRef([...Array(children.length)].map(() => createRef()));
    const [atLeftEdge, setAtLeftEdge] = useState(true);
    const [atRightEdge, setAtRightEdge] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const [cardWidth, setCardWidth] = useState(0);
  
    useEffect(() => {
      setCardWidth(cardRefs.current[0].current.clientWidth);
    }, [children]);
  
    // const cardWidth = () => cardRefs.current[0].current.clientWidth;
  
    const checkIfAtEdge = () => {
      const scrollLength = viewport.current.scrollLeft;
      const viewportLength = viewport.current.clientWidth;
      const totalLength = viewport.current.scrollWidth;
      setAtRightEdge(scrollLength + viewportLength === totalLength);
      setAtLeftEdge(scrollLength === 0);
    };
  
    const getScrollParams = steps => {
      const durationUnit = 300;
      return {
        scrollWidth: steps * cardWidth,
        scrollTime: Math.min(steps * durationUnit, 600)
      };
    };
    const handleScroll = isForward => {
      const { scrollWidth, scrollTime } = getScrollParams(stepSize);
      const newPosition =
        viewport.current.scrollLeft + (isForward ? scrollWidth : -scrollWidth);
      return scrollTo({
        element: viewport.current,
        to: newPosition,
        duration: scrollTime,
        scrollDirection: "scrollLeft",
        callback: checkIfAtEdge,
        context: this
      });
    };
    const moveToSplitIndex = () => {
      const scrollTime = 600;
      const newPosition = Math.max(splitIndex - 1, 0) * cardWidth;
      return scrollTo({
        element: viewport.current,
        to: newPosition,
        duration: scrollTime,
        scrollDirection: "scrollLeft",
        callback: checkIfAtEdge,
        context: this
      });
    };
  
    const handleGoForward = e => {
      e.preventDefault();
      handleScroll(true);
    };
    const handleGoBack = e => {
      e.preventDefault();
      handleScroll(false);
    };
    const toggleExpansion = () => {
      //setExpanded(!expanded);
    };
  
    const handleCollapse = () => {
      //moveToSplitIndex();
      //collapseCards();
    };
    //const handleExpand = () => {};
  
    //useEffect(() => {
    //  if (collapse) handleCollapse();
    //  else handleExpand();
    //}, [collapse]);
  
    const CardCollapseContainer = styled.div`
      opacity: 1;
      left: ${props => props.cardWidth * props.index}px;
      &.collapse {
        animation: ${({ cardWidth, gap, index }) =>
            collapseCards(cardWidth, gap, index)}
          0.5s 0.7s forwards;
      }
      &.expand {
        animation: ${({ cardWidth, gap, index }) =>
            expandCards(cardWidth, gap, index)}
          0.5s forwards;
      }
    `;
  
    const wrapCard = (baseCard, index) => {
      return (
        <div
          className={styles.card}
          ref={cardRefs.current[index]}
          style={
            index === children.length - 1
              ? null
              : { paddingRight: `${cardDist}px`, zIndex: children.length - index }
          }
        >
          
            <div
            >
              {baseCard}
            </div>
          
        </div>
      );
    };
  
    useEffect(() => {
      checkIfAtEdge();
      window.addEventListener("resize", checkIfAtEdge);
    });
  
    const ArrowNavPair = () => (
      <div className={styles.arrows}>
        <ArrowNavigator
          handleClick={handleGoBack}
          backward
          className={`${styles.arrow} ${styles.left} ${atLeftEdge &&
            styles.hide}`}
        />
        <ArrowNavigator
          handleClick={handleGoForward}
          className={`${styles.arrow} ${styles.right} ${atRightEdge &&
            styles.hide}`}
        />
      </div>
    );
  
    return (
      <div className={`${styles.container} ${navOnTop && styles.extendToEdge}`}>
        <div className={styles.titlebar}>
          {navOnTop && <ArrowNavPair />}
          {navTitle()}
        </div>
  
        <div className={styles.slider}>
          {!navOnTop && <ArrowNavPair />}
          <div className={styles.cardContainer}>
            <div
              className={styles.scrollable}
              ref={viewport}
              onScroll={checkIfAtEdge}
            >
              {Children.map(children, child =>
                cloneElement(child, {
                  expanded,
                  setExpanded: toggleExpansion
                })
              ).map(wrapCard)}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  Carousel.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    stepSize: PropTypes.number,
    cardDist: PropTypes.number,
    navOnTop: PropTypes.bool,
    navTitle: PropTypes.func
  };
  
  Carousel.defaultProps = {
    children: [],
    stepSize: 1,
    cardDist: 13,
    navOnTop: false,
    navTitle: () => {}
  };
  
  export default Carousel;
  