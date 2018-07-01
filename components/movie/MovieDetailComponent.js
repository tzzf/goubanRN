import React from 'react'
import fly from './../../server/fly';
// 导入View 和 Text组件  来自与react-native
import {View,Text,Alert,StyleSheet,Image,ActivityIndicator} from 'react-native'
// 导入Actions组件 是路由的组件用来实现跳转到某个路由的键
import {Actions} from 'react-native-router-flux';
export default class MovieDetailComponent extends React.Component{
	constructor(props){
		super(props)	
		this.state = {
			detail:{},//电影详情数据的对象
			isLoaded:false//是否加载完毕
		}	
	}
	//根据当前父组件传递的id来获取电影的详情数据
	componentWillMount(){
		fly.request('movie/subject/'+this.props.id,{},{
			method:"get",
			timeout:5000 //超时设置为5s
		  })
		  .then((data) =>{
			console.log(data);
			this.setState({
				detail:data,
				isLoaded:true
			})
		}).catch((e) => console.log("error", e));
	}
	render(){
		//判断数据是否加载完毕
		if(this.state.isLoaded == false){
			// 如果没有加载完毕就显示转圈圈
			return <ActivityIndicator
	        style={[styles.centering, {height: 80}]}
	        size="large"
	      />
		}else{
			return <View style={styles.container}>
				<View style={styles.movieImg}>
					 <Image
			        style={styles.img}
			        resizeMode="stretch"
			        source={{uri: this.state.detail.images.small}}
			      />
				</View>		
				<View style={styles.movieName}>
					<Text style={styles.movieNameText}>{this.state.detail.title}</Text>
				</View>	
				<View >
					<Text style={styles.castsTitle}>主要演员</Text>
				</View>
				<View style={styles.casts}>
						{
							this.state.detail.casts.map((item,i) =>{
								return <View key={i}>
									<Image
							        style={styles.castImg}
							        resizeMode="stretch"
							        source={{uri: item.avatars.small}}
							      />
							      <Text style={styles.castName}>{item.name}</Text>
								</View>
							})
						}						
				</View>
				<View style={styles.summary}>
					<Text style={styles.summaryTitle}>剧情简介</Text>
					<Text>{this.state.detail.summary}</Text>
				</View>
			</View>
		}		
	}
}

const styles = StyleSheet.create({
	centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
	container:{
		width:'100%',
		height:'100%',
		padding:20
	},
	movieImg:{
		width:'100%',
		justifyContent:'center',
		flexDirection:'row'
	},
	img:{
		width:160,
		height:200
	},
	movieName:{
		width:'100%',
		justifyContent:'center',
		flexDirection:'row'
	},
	movieNameText:{
		fontSize:20,
		fontWeight:'600',
		marginTop:10,
		marginBottom:10,
	},
	castsTitle:{
		fontSize:20,
		marginTop:5,
		marginBottom:5
	},
	casts:{
		flexDirection:'row',
		justifyContent: 'space-between',
	},
	castImg:{
		width:100,
		height:120
	},
	castName:{
		textAlign:'center'
	},
	summary:{

	},
	summaryTitle:{
		fontSize:20,
		marginTop:5,
		marginBottom:5
	}
})