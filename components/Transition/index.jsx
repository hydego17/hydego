import styled from "@emotion/styled";
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group";

const TIMEOUT = 200;

const getTransitionStyles = {
  entering: {
    opacity: 0,
    transform: `translateX(-75px)`,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `translateX(0px)`,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `translateX(200px)`,
  },
};

const Transition = ({ children, location }) => {
  return (
    <TransitionGroup>
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          <TransitionStyled
            style={{
              ...getTransitionStyles[status],
            }}
          >
            {children}
          </TransitionStyled>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};

const TransitionStyled = styled.div``;

export default Transition;
