import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import axios from 'axios';
import Dashboard from './Weather';

class Home extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'blue'
    }
  }

    state = {
      latitude: 0,
      longitude: 0,
      error: null,
      dashboard: false,
      input: "",
      data: {},
      name: "",
    }



    componentDidMount(){
      this.changeLocation();
    }

     changeLocation = () => {
       navigator.geolocation.getCurrentPosition( position => {
       this.setState({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         error: null,
       })
       },
       error => this.setState({
       error: error.message,
       }),
       {
       enableHighAccuracy: true,
       timeout: 20000,
       maximumAge: 2000
       }
      )
    }

    changeDashboard =() =>{
      this.setState( prev => ({
        dashboard: !prev.dashboard,
      }))
    }

    markerClick= () => {
      let lat = this.state.latitude;
      let lng = this.state.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=b5ec4144af2651a6b2eb07fb26d8ba0c&lang=ua`)
      .then(response => {
      this.setState ({
        name: response.data.name,
        input: response.data.name,
      })
    })
    }

    writeStateWithLonLgt=(result)=> {
      this.setState({
        latitude: result.nativeEvent.coordinate.latitude,
        longitude: result.nativeEvent.coordinate.longitude,
        data: result.data,
      })
    }

  render() {
    return (
      <View style={styles.contain}>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.changeDashboard ? alert('Scroll to open sidebar!') : null}}
        centerComponent={{ text: 'Weather Maps', style: { color: '#fff' } }}
      />
              <MapView onLongPress={this.writeStateWithLonLgt} style={styles.map} region={{
               latitude: this.state.latitude,
               longitude: this.state.longitude,
               latitudeDelta: 0.04,
               longitudeDelta: 0.05,
              }}>
              <Marker title={this.state.name} onPress={this.markerClick} coordinate={this.state}/>
              </MapView>
            </View>
    );
  }
}

const styles = StyleSheet.create({
   contain: {
    flex: 1,
    flexDirection: 'column'
  },
  map:{
        position: 'absolute',
        top: 80,
        right: 0,
        bottom: 0,
        left: 0,
  },
  dashboard: {
     height: 700,
     backgroundColor: 'green',
     alignItems: 'center',
     justifyContent: 'center',
   },
});

export default Home;
