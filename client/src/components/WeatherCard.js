import React from 'react';
import './WeatherCard.css';

class WeatherCard extends React.Component {
    state= {searched_location:'',forecast: '',forecast_location:'', latitude:'', longitude:''}

    //Manual Search
    onFormSubmit = (e) =>{
        this.setState({forecast_location:''})
        this.setState({forecast:'Fetching...'})
        e.preventDefault()
        console.log(this.state.searched_location)
        
        fetch('http://localhost:5000/weather?address=' +  this.state.searched_location + '').then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    this.setState({forecast_location:''})
                    this.setState({forecast:'Please provide a valid location!'})
                } else {
                    console.log(data.forecast)
                    this.setState({searched_location:''})
                    this.setState({forecast:data.forecast})
                    this.setState({forecast_location:data.Weather_location})
                }
            })
        })     
    }

    //Current Location


    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({latitude:position.coords.latitude, longitude:position.coords.longitude})
                this.setState({forecast:'Fetching weather at your current location...'})
                fetch('http://localhost:5000/weatherAtCurrentLocation?latitude='+position.coords.latitude+'&longitude='+position.coords.longitude+'').then((response)=>{
                    response.json().then((data)=>{
                        if (data.error) {
                            console.log(data.error)
                        } else {
                            console.log(data.forecast)
                            this.setState({forecast:data.forecast})
                            this.setState({forecast_location:'At your Current Location:'})                    
                        }
                    })
                })
            }
        )
    }

    render(){
        
        return(
            <div className="ui vertical segment " >
                <form className="ui form" onSubmit={this.onFormSubmit} >
                    <h4 >Search Weather</h4>
                    <input type='text' placeholder='location' 
                        onChange={(e)=>this.setState({searched_location: e.target.value})}
                        value={this.state.searched_location}  />
                    <button className='ui primary button' >Search</button>
                    
                </form>
                <div className='ui segment' >
                    <h3>{this.state.forecast_location}</h3>  
                    {this.state.forecast}
                </div>
            </div>
        )
    }
    
}

export default WeatherCard