import React, { Component } from "react";

class Controls extends Component {

  render() {
    const { onSearchInput, onLikeInput } = this.props;

    return (
      <>
        <input onInput={onSearchInput} type="text" />
        <select onInput={onLikeInput}>
            <option value=""></option>
            <option value="liked">Liked</option>
            <option value="notLiked">Not Liked</option>

        </select>
      </>
    );
  }
}

export default Controls;
