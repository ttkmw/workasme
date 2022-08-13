import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";

const TimeBlockEditForm: React.FC<{onSubmit: (e) => void}> = (props: {onSubmit: (e) => void}) => {
  const {onSubmit} = props;
  return <form
    css={css({
      "input[type=time]::-webkit-clear-button": {
        "-webkit-appearance": "none",
        "-moz-appearance": "none",
        "-o-appearance": "none",
        "-ms-appearance": "none",
        "appearance": "none",
        "margin": "-10px",
      },
      "label": {
        marginBottom: "0px"
      },
      fontFamily: "ObjectSans-Slanted"
    })}
    onSubmit={onSubmit}
  >
    <div className="form-group" css={css({
      display: "flex",
      flexDirection: "row",
    })}>
      <label className="input-key" css={css({
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: "30px",
      })} htmlFor="title">title </label>
      <div css={css({
        width: "280px",
        borderWidth: "0px",

        "-moz-box-shadow": "0 4px 6px -6px #222",
        "-webkit-box-shadow": "0 4px 6px -6px #222",
        "box-shadow": "0 4px 6px -6px #222",
        ":focus-visible": {
          outline: "0px"
        }
      })} id="title"/>
    </div>
  </form>
};

export default TimeBlockEditForm;
