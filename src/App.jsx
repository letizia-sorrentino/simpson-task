import React, { Component } from 'react';
import axios from 'axios';
import Loading from './components/Loading';
import Data from './components/Data';

class App extends Component {
  state = {  } 

async componentDidMount() {

const { data } = await axios.get(`https://thesimpsonsquoteapi.glitch.me/quotes?count=5`);
//console.log(data);
this.setState({data});

}

  render() { 
    //conditional rendering - if there is nothing in the state, show loading
    if (!this.state.data) 
    return <Loading/> //<div>Loading...</div>
    return <Data />           //<div>I have the data</div>;

    //in alternative you can use a ternary
    // return this.state.data ? "Data" : "loading";
  }
}
 
export default App;