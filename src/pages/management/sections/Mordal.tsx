import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
import Form from "src/pages/management/sections/Form";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

export const Modal = ({
                        onClickOutside,
                        onKeyDown,
                        modalRef,
                        buttonRef,
                        closeModal,
                        onSubmit
                      }: any) => {
  return ReactDOM.createPortal(
    <FocusTrap>
      <aside
        // tag="aside"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        onClick={onClickOutside}
        onKeyDown={onKeyDown}
        css={css({
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          transform: 'translateZ(0)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          // position: fixed;
          // top: 0;
          // left: 0;
          // width: 100%;
          // height: 100%;
          // z-index: 10;
          // transform: translateZ(0);
          // background-color: rgba(0, 0, 0, 0.8);
          '@media screen and (min-width: 500px)': {
            '.modal-area': {
              left: '50%',
              top: '50%',
              height: 'auto',
              transform: 'translate(-50%, -50%)',
              maxWidth: '30em',
              maxHeight: 'calc(100% - 1em);'
              //     left: 50%;
              //     top: 50%;
              //     height: auto;
              //     transform: translate(-50%, -50%);
              //     max-width: 30em;
              // max-height: calc(100% - 1em);
            }
          }
        })}


      >
        <div css={css({
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          padding: '2.5em 1.5em 1.5em 1.5em',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 10px 3px rgba(0, 0, 0, 0.1)',
          overflowY: "auto",
          webkitOverflowScrolling: 'touch',

        })} className="modal-area" ref={modalRef}>
          <button
            ref={buttonRef}
            aria-label="Close Modal"
            aria-labelledby="close-modal"
            className="_modal-close"
            onClick={closeModal}
          >
            <span id="close-modal" className="_hide-visual">
              Close
            </span>
            <svg className="_modal-close-icon" viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <div css={css({
            paddingTop: '0.25em'
          })}>
            <Form onSubmit={onSubmit} />
          </div>
        </div>
      </aside>
    </FocusTrap>,
    document.body
  );
};

export default Modal;
