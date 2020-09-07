import React from 'react';
import './App.css';

class App extends  React.Component {
  state = {
    location: '',
    isLoading: false,
    apiKey: process.env.REACT_APP_API_KEY ,
    weather: ''
  }

  handleChange = (event) => {
    let {value} = event.target
    this.setState({
      location: value
    }) 
  }

  onClick = event => {
    if (this.state.location) {
      this.setState({
        isLoading: true
      })
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${
          this.state.location}&appid=${this.state.apiKey}`)
            .then(response => response.json()
      ).then(response => {
        this.setState({
          weather: response,
          isLoading: false})
      })
      }
    }
    
  render() {
    return (
      <div className='container weather'>
        <input 
          type='text'
          className='text'
          placeholder='Enter City'
          value={this.state.location}
          onChange={this.handleChange}
          name='location'
          width='100px'
          height='30px' /> <br/>
        <button 
          className='btn' 
          disabled={this.state.isLoading || this.state.location === ''}
          style={
            (this.state.isLoading || this.state.location === '')? {
              cursor: 'not-allowed',
              pointerEvents: 'none'
            }: null
          }
          onClick={this.onClick}>
            {this.state.isLoading? 'Loading...': 'Get Weather'}
        </button>
        <div className='text' style={{color:'gray', fontSize:'30'}}>
          {this.state.weather? 
              <div>The weather : {this.state.weather.weather[0].main} <br/>
                  The humidity :   {this.state.weather.main.humidity}% <br/>
                  Temperature: {parseInt(this.state.weather.main.temp) - 273}&#176;C</div>
            : ''}
        </div>
        </div>
    );
  }

}

export default App;
 
  