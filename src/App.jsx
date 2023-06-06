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

  //Search box
  onSearchInput = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  onLikeInput = (e) => {
    this.setState({ likeInput: e.target.value });
  };

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

  //Function to return the filtered list
  getFilteredList = () => {
    const { simpsons, searchInput, likeInput } = this.state;

    //calculate the data we want to show
    let filteredList = [...simpsons];

    //filtered by search
    if (searchInput) {
      filteredList = filteredList.filter((char) => {
        console.log(char.character, searchInput);
        if (char.character.toLowerCase().includes(searchInput.toLowerCase()))
          return true;
      });
    }

    //sort by liked / not liked
    if (likeInput === "liked") {
      filteredList.sort((itemOne, itemTwo) => {
        if (itemOne.liked === true) return -1;
        if (!itemTwo.liked) return 1;
      });
    } else if (likeInput === "notLiked") {
      filteredList.sort((itemOne, itemTwo) => {
        if (itemTwo.liked === true) return -1;
        if (!itemOne.liked) return 1;
      });
    }

    return filteredList;
  };

  render() {
    //console.log(this.state);

    const { simpsons } = this.state;

    if (!simpsons) return <Loading />;

    if (simpsons.length === 0) return <p>You deleted all the characters!</p>;

    //calculate the total likes
    let total = 0;
    simpsons.forEach((char) => {
      if (char.liked) total++;
    });
    console.log(this.state.searchInput);
    return (
      <>
        <h1>Total no of liked chars #{total}</h1>
        <Simpsons
          //simpsons={filteredList}
          //list={filteredList.lenght ? filteredList : simpsons}
          //list={filteredList}
          simpsons = {this.getFilteredList()}
          onDelete={this.onDelete}
          onLikeToggle={this.onLikeToggle}
          onSearchInput={this.onSearchInput}
          onLikeInput={this.onLikeInput}
        />
      </>
    );
  }
}

export default App;
