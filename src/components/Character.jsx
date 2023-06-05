import React, { Component } from "react";
import Name from "./Name";
import Quote from "./Quote";
import Image from "./Image";
import Delete from "./Delete";

class Character extends Component {
  state = { like: false };

  onLikeToggle = () => {
    this.setState({ like: !this.state.like });
  };

  render() {
    const { character, quote, image, id, characterDirection} = this.props.item;
    const { like } = this.state;

  //Make the character face the correct direction changing the order of the components
    if (characterDirection === "Left") {
      return (
        <div className="characterContainer">
          <Name
            character={character}
            like={like}
            onLikeToggle={this.onLikeToggle}
          />
          <Image image={image} like={like} />
          <Quote quote={quote} />
          <Delete onDelete={this.props.onDelete} id={id} />
        </div>
      );
    }

    return (
      <div className="characterContainer">
        <Name
          character={character}
          like={like}
          onLikeToggle={this.onLikeToggle}
        />
        <Quote quote={quote} />
        <Image image={image} like={like} />
        <Delete onDelete={this.props.onDelete} id={id} />
      </div>
    );
  }
}

export default Character;
