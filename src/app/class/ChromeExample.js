"use client";

import React from "react";
import reactCSS from "reactcss";
import { ChromePicker } from "react-color";

class ChromeExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: this.props.initialColor || {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    if (this.props.onChange) {
      this.props.onChange(color.rgb);
    }
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "26px",
          height: "14px",
          borderRadius: "2px",
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
          border: "1px white solid",
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          right: "24%",
          top: '25%',
          zIndex: "21",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <div>
        <div style={styles.color} onClick={this.handleClick} />
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <ChromePicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ChromeExample;
