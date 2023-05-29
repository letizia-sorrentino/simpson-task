import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
  state = {  } 

async componentDidMount() {

const { data } = await axios.get(`https://thesimpsonsquoteapi.glitch.me/quotes?count=5`);
//console.log(data);
this.setState({data});
}

  render() { 
    if (!this.state.data) //if there is nothing in the state, show loading
    return <div>Loading...</div>

    return <div>I have the data</div>;
  }
}
 
export default App;