/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} from 'react-native';

// const instructions = Platform.select({
//   ios: 'ios' +
//     'Cmd+D or shake for dev menu11',
//   android: '安卓' +
//     'Shake or press menu button for dev menu',
// });
// 导入路由的组件
import {Scene, Router,Actions} from 'react-native-router-flux';
import TabNavigator from 'react-native-tab-navigator';
import fly from './server/fly';

fly.request("/movie/subject/1764796",{},{
  method:"get",
  timeout:5000 //超时设置为5s
})
.then(d=>{ console.log(d);})
.catch((e) => console.log("error", e));
type Props = {};
// 导入首页的组件并且渲染
import HomeComponent from './components/home/HomeComponent'
import MovieListComponent from './components/movie/MovieListComponent'
import MovieDetailComponent from './components/movie/MovieDetailComponent'
import AboutComponent from './components/about/AboutComponent'
export default class App extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      selectedTab:'home'
    }
  }
  goHome(){
    // 点击了某个tab把当前组件的状态的selectedTab更改  设置状态要使用setState方法来设置
    // this.state.selectedTab = 'home';
    this.setState({
      selectedTab:'home'
    })
    //使用导航插件要跳转页面的时候必须使用函数的方式跳转
    Actions.home();
  }
  goMovie(){
    this.setState({
      selectedTab:'movie'
    })
    //使用导航插件要跳转页面的时候必须使用函数的方式跳转
    Actions.movie({'movieType':'in_theaters'});
  }
  goAbout(){
    this.setState({
      selectedTab:'about'
    })
    //使用导航插件要跳转页面的时候必须使用函数的方式跳转
    Actions.about();
  }
  render() {
    return (
      <View style={styles.container}>
          <Router>
            <Scene key="root">
              <Scene key="home" component={HomeComponent} title="首页" initial={true} />
              <Scene key="movie" component={MovieListComponent} title="电影列表"/>
              <Scene key="detail" component={MovieDetailComponent} title="电影详情"  />
              <Scene key="about" component={AboutComponent} title="我是关于"   />
            </Scene>
          </Router>
        <View style={styles.tabContainer}>
             <TabNavigator>  
                <TabNavigator.Item  
                    selected={this.state.selectedTab === 'home'}
                    title="首页"  
                    titleStyle={styles.tabText}  
                    selectedTitleStyle={styles.selectedTabText}  
                    renderIcon={() => <Image style={styles.icon} source={require('./image/home.png')} />}
                    renderSelectedIcon={() => <Image style={styles.icon} source={require('./image/home_active.png')} />}
                    onPress={() => this.goHome()}
                    >  
                    <View></View>
                </TabNavigator.Item>  
                <TabNavigator.Item  
                    selected={this.state.selectedTab === 'movie'}
                    title="电影"  
                    titleStyle={styles.tabText}  
                    selectedTitleStyle={styles.selectedTabText}  
                    renderIcon={() => <Image style={styles.icon} source={require('./image/movie.png')} />}
                    renderSelectedIcon={() => <Image style={styles.icon} source={require('./image/movie_active.png')} />}
                    onPress={() => this.goMovie()}
                    >  
                    <View></View>
                </TabNavigator.Item>  
                <TabNavigator.Item  
                    selected={this.state.selectedTab === 'about'}
                    title="关于"  
                    titleStyle={styles.tabText}  
                    selectedTitleStyle={styles.selectedTabText}  
                    renderIcon={() => <Image style={styles.icon} source={require('./image/about.png')} />} 
                    renderSelectedIcon={() => <Image style={styles.icon} source={require('./image/about_active.png')} />} 
                    onPress={() => this.goAbout()}
                   >  
                   <View></View>
                </TabNavigator.Item> 
            </TabNavigator>
        </View>       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%'
  },
  routerContainer:{
  },
  tabContainer:{
    height:50
  },
  tabText:{
    color:'#000000',
    fontSize:10
  },
  selectedTabText:{
    color:'#D81E06'
  },
  icon:{
    width:20,
    height:20
  }
});
