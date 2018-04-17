import React from 'react';
import { Text, View, Button, ActivityIndicator, StyleSheet, FlatList, List, ListView, Image, TextInput, RefreshControl, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'; // Version can be specified in package.json


const logo = require('./src/gambar.jpg');

class openScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={logo} />
        <Text style = {{ fontSize: 24 }}>UKM Catur Undiksha</Text>
        <Button
          title="Login"
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}
        />
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
    };
}

  componentDidMount()  {
      const url = 'http://gusnando.com/mobile/arysudewa/daftarmahasiswa.php';
       this.setState({ loading: true });
      fetch (url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("comp");
        console.log(responseJson);
        this.setState({
          data: responseJson,
          error: responseJson.error || null,
          loading: false,
          refreshing: false
        });
      }
    );
  }

  GetStudentIDFunction=(nim,nama,semester,jurusan,fakultas)=>{
    this.prop.navigation.navigate('Detail',{

      nim: nim,
      nama: nama,
      semester: semester,
      jurusan: jurusan,
      fakultas: fakultas

    });

  }
  _keyExtractor = (item, index) => item.nim;
  render() {
    return (
      <View style={{marginTop: 30, justifyContent:'center'}}>

        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
            <View style={styles.ListItem}>
              <Text style={styles.ListFirst}>nama : {item.nama}</Text>
              <Text>nim : {item.nim}</Text>
              <Text>semseter  :{item.semester}</Text>
              <Text>jurusan : {item.jurusan}</Text>
              <Text>fakultas : {item.fakultas}</Text>
            </View>
        } 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount.bind(this)}
          />
        }
        />


      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor()
  {
      super();

      this.state = { 
        nim: '',
        nama: '',
        semester: '', 
        jurusan: '', 
        fakultas: '',
        ActivityIndicator_Loading: false, 

      }
  }
  //fungsi mengirim data ke database
  Insert_Data_Into_MySQL = () =>
  {
      this.setState({ ActivityIndicator_Loading : true }, () =>
      {
          fetch('http://gusnando.com/mobile/arysudewa/kirimdata.php',
          {
              method: 'POST',
              headers: 
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
              {
                nim : this.state.nim,
                nama : this.state.nama,
                semester : this.state.semester,
                jurusan : this.state.jurusan,
                fakultas : this.state.fakultas,
              })

          }).then((response) => response.json()).then((responseJsonFromServer) =>
          {
              alert(responseJsonFromServer);
              this.setState({ ActivityIndicator_Loading : false });
          }).catch((error) =>
          {
              console.error(error);
              this.setState({ ActivityIndicator_Loading : false});
          });
      });
  }

  render() {
    return (
<View style = { styles.container } >
        <TextInput 
        placeholder = "Masukan NIM"
        style = { styles.TextInputStyleClass } 
        underlineColorAndroid = "transparent"
        onChangeText = {(TextInputText) => this.setState({ nim: TextInputText })} 
        />
   
      <TextInput 
        placeholder = "Masukan Nama"
        style = { styles.TextInputStyleClass } 
        underlineColorAndroid = "transparent"
        onChangeText = {(TextInputText) => this.setState({ nama: TextInputText })} 
        />
   
      <TextInput  
        placeholder = "Masukan semester" 
        style = { styles.TextInputStyleClass } 
        underlineColorAndroid = "transparent"
        onChangeText = {(TextInputText) => this.setState({ semester: TextInputText })} 
        />

      <TextInput  
        placeholder = "Masukan Jurusan" 
        style = { styles.TextInputStyleClass } 
        underlineColorAndroid = "transparent"
        onChangeText = {(TextInputText) => this.setState({ jurusan: TextInputText })} 
        />

        <TextInput  
        placeholder = "Masukan Fakultas" 
        style = { styles.TextInputStyleClass } 
        underlineColorAndroid = "transparent"
        onChangeText = {(TextInputText) => this.setState({ fakultas: TextInputText })} 
        />
                   <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style = { styles.TouchableOpacityStyle } 
                  onPress = { this.Insert_Data_Into_MySQL }>
                    <Text style = { styles.TextStyle }>DAFTAR</Text>
                </TouchableOpacity>

   
      </View>
      
    );
  }
}

class SearchScreen extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      ActivityIndicator_Loading: false, 
    };
}

  cariData = () => {
            this.setState({ ActivityIndicator_Loading: true },
                () => {
                    //this.setState({ refreshing: true });
                    fetch(
                            "http://gusnando.com/mobile/arysudewa/cariMhs.php", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    cari: this.state.cari
                                })
                            }
                        )
                        .then(response => response.json())
                        .then(responseJson => {
                            console.log("comp");
                            console.log(responseJson);
                            this.setState({
                                data: responseJson,
                                error: responseJson.error || null,
                                loading: false,
                                refreshing: false,
                                ActivityIndicator_Loading: false
                            });
                        });
                }
            );
        };
  _keyExtractor = (item, index) => item.nim;

  render() {
    return (
<KeyboardAvoidingView behavior="padding" style={ styles.MainContainer }>
                <TextInput  
                  placeholder = "Masukan NIM atau Nama" 
                  style = { styles.TextInputStyleClass } 
                  underlineColorAndroid = "transparent"
                  returnKeyType="done"
                  onChangeText = {(TextInputText) => this.setState({ cari
                    : TextInputText })} />

                <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style = { styles.TouchableOpacityStyle } 
                  onPress = { this.cariData }>
                    <Text style = { styles.TextStyle }>Cari Data</Text>
                </TouchableOpacity>

                {
        
                   this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null
                
                }
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
            <View style={styles.BoxClass}>
              <Text>NIM : {item.nim}</Text>
              <Text>Nama : {item.nama}</Text>
              <Text>Semester : {item.semester}</Text>
              <Text>Jurusan : {item.jurusan}</Text>
              <Text>Fakultas : {item.fakultas}</Text>
              <View style={styles.EditClass}>
                </View>
            </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount.bind(this)}
          />
        }
        /> 
        

   </KeyboardAvoidingView>   
      
    );
  }
}

class DetailScreen extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        nim: '',
        nama: '',
        semester: '', 
        jurusan: '', 
        fakultas: '',
    
       }
    
     }
 
     componentDidMount(){
 
      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({ 
        nim : this.props.navigation.state.params.nim,
        nama: this.props.navigation.state.params.nama,
        semester: this.props.navigation.state.params.semester,
        jurusan: this.props.navigation.state.params.jurusan,
        fakultas: this.props.navigation.state.params.fakultas,
      })
 
     }
    UpdateStudentRecord = () =>{
      
            fetch('http://gusnando.com/mobile/arysudewa/ubah.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
      
              nim : this.state.nim,
 
              nama : this.state.nama,
      
              kelas : this.state.semester,
      
              semester : this.state.jurusan,

              semester : this.state.fakultas,

      
            })
      
            }).then((response) => response.json())
                .then((responseJson) => {
      
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);
      
                }).catch((error) => {
                  console.error(error);
                });
  
      }
     DeleteStudentRecord = () =>{
        
          fetch('http://gusnando.com/mobile/arysudewa/hapus.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
        
            nama : this.state.nama
        
          })
        
          }).then((response) => response.json())
          .then((responseJson) => {
        
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
        
          }).catch((error) => {
             console.error(error);
          });
 
         // this.props.navigation.navigate('First');
 
      }
 
render() {
 
      return (
   
   <View style={styles.MainContainer}>
   
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Data Mahasiswa </Text>

         <TextInput
            
            placeholder="input nama"
 
            value={this.state.TextInput_kelas}
   
            onChangeText={ TextInputValue => this.setState({ nama : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TextInput
            
            placeholder="semester"
 
            value={this.state.TextInput_semester}
   
            onChangeText={ TextInputValue => this.setState({ semester : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />

                   <TextInput
            
            placeholder="jurusan"
 
            value={this.state.TextInput_semester}
   
            onChangeText={ TextInputValue => this.setState({ jurusan : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />

                   <TextInput
            
            placeholder="fakultas"
 
            value={this.state.TextInput_semester}
   
            onChangeText={ TextInputValue => this.setState({ fakultas : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
          
   
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateStudentRecord} >
            <Text style={styles.TextStyle}> Update Data </Text>
         </TouchableOpacity>
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeleteStudentRecord} >
            <Text style={styles.TextStyle}> Delete Data </Text>
        </TouchableOpacity>
   
   </View>
              
      );
    }
 
}


const OpeningStack = StackNavigator({
  open: { screen: openScreen },
  Home: { screen: HomeScreen },

});
const SettingStack = StackNavigator({
  Settings: { screen: SettingsScreen },

});   
const SearchStack = StackNavigator({
  Search: { screen: SearchScreen },

});
const DetailStack = StackNavigator({
  Detail: { screen: DetailScreen },

});


export default TabNavigator({
  UKM_Catur: { screen: OpeningStack },
  Anggota_Baru: { screen: SettingStack },
  Cari_Anggota: {screen: SearchStack},
});


const styles = StyleSheet.create({
  Header: {
      marginTop: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#64B5F6',
  },
  TextHeader: {
      fontSize: 30
  },
  ListItem: {
      backgroundColor:'#BBDEFB',
      marginTop: 5,
      flex: 1
  },
  ListFirst: {
    fontSize: 20
  },
  TextInputStyleClass: {
 
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 7,
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    borderWidth: 2,
    // Set border Hex Color Code Here.
     borderColor: '#2125ff',
     borderRadius: 7 
     
    // Set border Radius.
     //borderRadius: 10 ,
    }, 
    TouchableOpacityStyle:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#2196F3',
      marginBottom: 20,
      marginLeft: 80,
      marginTop: 30,
      width: '70%',
      borderRadius: 7,
 
    },
    TextStyle:
    {
       color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },
    BoxClass:
    {
      alignItems: 'flex-start',
      height: 150,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: 270,
      paddingTop: 5,
      paddingBottom: 5
    },

});

