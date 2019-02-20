import React from 'react';
import { Header, leftComponent, centerComponent } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, TextInput, Image, Form } from 'react-native';
import axios from 'axios';

class Dashboard extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'green'
    }
  }

  componentDidMount(){
    this.fetchData();
  }

 constructor() {
    super(),
    this.state = {
      text: '',
      geo: {},
      isLoading: true,
      clickError: false,
      location: '',
      city: '',
      input2: '',
    }
  }

  fetchData = (e) =>{
      e && e.preventDefault()
      const query = this.state.input;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?APPID=c60dd86e9ebff9397278842665cf0376&q=${query || 'Kiev'}&units=metric`)
      .then(response => {
        this.setState ({
          data: response.data,
          isLoading: false,
          location: response.data.name,
          city: response.data.sys.country,
          input2: this.state.input,
        })
      })
      .catch((error) => {
        console.log(error);
      })
    }

    changeWeather =() =>{
      this.setState( prev => ({
        clickError: !prev.clickError,
      }))
    }

//
//      changedInput = (event) => {
//        const value = event.target && event.target.value;
//        this.setState({
//          input: value,
//        })
//      }

    submit = () => {
      this.fetchData()
    }

  render() {
     const {data, location, city} = this.state;
    return (
    <ScrollView>
      {this.state.isLoading ? <Text style={{position: 'absolute', top: 100}}>Loading</Text> :
      <View style={styles.dashboard}>
        <View>
          
          <Header
        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.changeWeather ? alert('Scroll to open sidebar!') : null}}
        centerComponent={{ text: 'Weather', style: { color: '#fff' } }}
      />
          <View style={styles.form}>
           <TextInput
              placeholder="Enter the name of the city"
              label='text'
              style={{height: 40, borderColor: 'black', fontSize: 25, backgroundColor: '#fff', borderWidth: 1, padding: 5}}
              value={this.state.input}
              onChangeText={(input) => this.setState({input})}
              name="name"
            />
            <Button onPress={this.submit} title="Submit" style={styles.btn} />
            </View>
          <View style={styles.info}>
          <Image
            source={{uri: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`}}
            style={{width: 110, height: 100}}
           />
          <Text style={{fontSize: 20}}>City: {location},{city}</Text>
          <Text style={{fontSize: 20}}>Temperature: {data.main.temp.toFixed(0)}°</Text>
          <Text style={{fontSize: 20}}>Pressure: {data.main.pressure}mm</Text>
          <Text style={{fontSize: 20}}>Humidity: {data.main.humidity}%</Text>
          <Text style={{fontSize: 20}}>min °C: {data.main.temp_min}°</Text>
          <Text style={{fontSize: 20}}>max °C: {data.main.temp_max}°</Text>
          <Text style={{fontSize: 20}}>Wind: {data.wind.speed} m/s</Text>
          </View>
        </View>
      </View>
      }
     </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
   info: {
     flex: 1,
     marginTop: 50,
     alignItems: 'center',
   },
   btn: {
     backgroundColor: 'blue',
     height: 40,
     color: '#fff',
     justifyContent: 'center',
     alignItems: 'center'
   }
});

export default Dashboard;