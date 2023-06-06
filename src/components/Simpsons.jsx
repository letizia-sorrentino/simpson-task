import React, { Component } from "react";
import Character from "./Character";
import Controls from "./Controls";

class Simpsons extends Component {
  render() {
    const { simpsons, onDelete, onLikeToggle, onSearchInput, onLikeInput } = this.props;
    
    return (
      <>
      <Controls onSearchInput={onSearchInput} onLikeInput={onLikeInput}/>

        {simpsons.map((item, index) => {
          return (
            <Character
              item={item}
              key={item.id}
              onDelete={onDelete}
              onLikeToggle={onLikeToggle}

            />
          );
        })}
      </>
    );
  }
}

export default Simpsons;
