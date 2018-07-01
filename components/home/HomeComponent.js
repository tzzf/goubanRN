import React from 'react'
// 导入View 和 Text组件  来自与react-native
import {View,Text,StyleSheet,Image,Alert} from 'react-native'
// 导入Actions组件 是路由的组件用来实现跳转到某个路由的键
import {Actions} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
export default class HomeComponent extends React.Component{
	goMovieList(movieType){
		//设置路由跳转到电影列表 同时跟上我需要获取的电影列表的数据
		Actions.movie({'movieType':movieType})
	}
	render(){
		return <View style={styles.container}>
			<View style={styles.slideContainer}>
				<Swiper style={styles.wrapper} showsButtons>
	            <View style={styles.slide}>
	                <Image
				        style={styles.logo}
				        resizeMode="stretch"
						source={require('../../image/banner1.png')}
				      />
	            </View>
	            <View style={styles.slide}>
	                <Image
				        style={styles.logo}
				        resizeMode="stretch"
						source={require('../../image/banner2.png')}
				      />
	            </View>
	            <View style={styles.slide}>
	                <Image
				        style={styles.logo}
				        resizeMode="stretch"
						source={require('../../image/banner3.png')}
				      />
	            </View>
	        </Swiper>
			</View>
			<View style={styles.tabs}>
				<View style={[styles.tab,{'borderLeftWidth':0}]}>
					<Text onPress={() => this.goMovieList('in_theaters')}>正在热映</Text>
				</View>
				<View style={styles.tab}>
					<Text onPress={() => this.goMovieList('coming_soon')}>即将上映</Text>
				</View>
				<View style={styles.tab}>
					<Text onPress={() => this.goMovieList('top250')}>Top250</Text>
				</View>
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%'
  },
  slideContainer:{
  	width:'100%',
  	height:230
  },
  logo:{
  	width:'100%',
  	height:230
  },
  tabs:{
  	flexDirection:'row',  	
  },
  tab:{
  	flex:1,
  	height:50,
  	backgroundColor:'yellowgreen',
  	// 设置水平的居中 注意这两个居中的属性要在次轴里面添加 水平和垂直居中
  	justifyContent: 'center',
  	// 设置垂直的居中
  	alignItems: 'center',
  	borderLeftWidth:1,
  	borderStyle:'solid',
  	borderColor:'red'
  }
});
