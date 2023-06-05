import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import "./App.css";

class App extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=10`
    );

    //fixed the api data to have unique id
    data.forEach((element, index) => {
      element.id = index + Math.random();
    });

    console.log(data);
    this.setState({ simpsons: data });
  }

  // Function to update the character to toggle between like/dislike
  onLikeToggle = (id) => {
    //find the item
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });

    const simpsons = [...this.state.simpsons];
    // invert if liked or not liked
    simpsons[indexOf].liked = !simpsons[indexOf].liked;
    this.setState({ simpsons });
  };

  //Function to wire up delete button
  onDelete = (id) => {
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });

    const simpsons = [...this.state.simpsons];
    simpsons.splice(indexOf, 1);
    this.setState({ simpsons });
  };

  render() {
    const { simpsons } = this.state;

    if (!simpsons) return <Loading />;

    if (simpsons.length === 0) return <p>You deleted all the characters!</p>;

    //calculate the total
    let total = 0;
    simpsons.forEach((char)=> {
      if (char.liked) total++;
    });


    return (
      <>
        <h1>Total no of liked chars #{total}</h1>
        <Simpsons 
        simpsons={simpsons} 
        onDelete={this.onDelete} 
        onLikeToggle={this.onLikeToggle}
        />
      </>
    );
  }
}

export default App;
