import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import {DateTime} from "src/model/DateTime";
import Pixel from "src/graphic/size/pixel";
import colors from "src/constants/Colors";
import {MdNavigateBefore} from "react-icons/md";
import {IoMdClose} from "react-icons/all";

interface ModalProps {
  onClickOutside: (e) => void,
  onKeyDown: (e) => void,
  modalRef: (n) => void,
  buttonRef: (n) => void,
  closeModal: (e) => void,
  children: ReactNode;
}

export const Modal = ({
                        onClickOutside,
                        onKeyDown,
                        modalRef,
                        buttonRef,
                        closeModal,
                        children
                      }: ModalProps) => {
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
          padding: '1.0em 1.0em 1.2em 2em',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 10px 3px rgba(0, 0, 0, 0.1)',
          overflowY: "auto",
          webkitOverflowScrolling: 'touch',

        })} className="modal-area" ref={modalRef}>
          <div css={css({
            display: "flex",
            justifyContent: "flex-end"
          })}>
            <button
              ref={buttonRef}
              aria-label="Close Modal"
              aria-labelledby="close-modal"
              onClick={closeModal}
              css={css({
                backgroundColor: "rgba( 255, 255, 255, 1 )",
                ":focus-visible": {
                  outline: "0px"
                },
                borderWidth: "0px"
              })}

            >
              {/*<span id="close-modal" className="_hide-visual">*/}
              {/*  Close*/}
              {/*</span>*/}
              <IoMdClose css={css({})} size={new Pixel(25).toString()} color={colors.theme.table.outLine}
                         onClick={() => {
                         }}/>
              {/*<svg className="_modal-close-icon" viewBox="0 0 40 40">*/}
              {/*  <path d="M 10,10 L 30,30 M 30,10 L 10,30"/>*/}
              {/*</svg>*/}
            </button>
          </div>

          <div css={css({
            marginTop: "16px"
          })}>
            {children}
          </div>
        </div>
      </aside>
    </FocusTrap>,
    document.body
  );
};

export default Modal;
