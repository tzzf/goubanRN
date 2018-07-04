import React from 'react'
import fly from './../../server/fly';
// 导入View 和 Text组件  来自与react-native
import {View,Text,Image,StyleSheet,Alert,FlatList,ActivityIndicator,TouchableOpacity} from 'react-native'
// 导入Actions组件 是路由的组件用来实现跳转到某个路由的键
import {Actions} from 'react-native-router-flux';
export default class MovieListComponent extends React.Component{
	constructor(props){
		super(props)
		// 给组件定义一个状态来存储fetch获取到的数据
		this.state = {
			movieList:[{title:'头号玩家'}],//所有的电影列表数据
			isLoaded:false//是否加载完毕
		}
	}
	_extraUniqueKey(item ,index){
      return item.id
   }
    componentDidMount(){
		fly.request('movie/'+this.props.movieType,{},{
			method:"get",
			timeout:5000 //超时设置为5s
		  })
		  .then((data) =>{
			  console.log(data);
			this.setState({
				movieList:data.subjects,//把数据的subjects数组赋值给状态的电影列表
				isLoaded:true//已经加载完毕
			})
		}).catch((e) => console.log("error", e));
	}
	goMovieDetail(id){
		Actions.detail({'id':id})
	}
	render(){
		//判断当前数据是否加载完毕
		if(this.state.isLoaded == false){
				return <ActivityIndicator
        style={[styles.centering, {height: 80}]}
        size="large"
      />
		}else{
			return <View style={styles.container}>
				{/*{
					this.state.movieList.map((item,i) => {
						return <View style={styles.item} key={i}>
							<Image
					        style={styles.logo}
					        resizeMode="stretch"
					        source={{uri: item.images.small}}
					      />
					      <View style={styles.right}>
					      	<View style={styles.name}><Text style={styles.size}>电影名称:{item.title}</Text></View>
					      	<View style={styles.name}><Text style={styles.size}>电影类型:{item.genres.join('、')}</Text></View>
					      	<View style={styles.name}><Text style={styles.size}>上映时间:{item.year}</Text></View>
					      	<View style={styles.name}><Text style={styles.size}>评分:{item.rating.average}</Text></View>
					      </View>
						</View>
					})
				}*/}
				<FlatList
				  data={this.state.movieList}
				  keyExtractor={(item) => this._extraUniqueKey(item)}
				  renderItem={({item}) => 
				  	<View  key={this._keyExtractor}>
						<TouchableOpacity onPress={() => this.goMovieDetail(item.id)} style={styles.item}>
							<Image
							style={styles.logo}
							resizeMode="stretch"
							source={{uri: item.images.small}}
							/>
							<View style={styles.right}>
								<View style={styles.name}><Text style={styles.size}>电影名称:{item.title}</Text></View>
								<View style={styles.name}><Text style={styles.size}>电影类型:{item.genres.join('、')}</Text></View>
								<View style={styles.name}><Text style={styles.size}>上映时间:{item.year}</Text></View>
								<View style={styles.name}><Text style={styles.size}>评分:{item.rating.average}</Text></View>
							</View>
						</TouchableOpacity>
					</View>
				  }
				/>				
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
	item:{
		flexDirection:'row',
		padding:10,
		borderBottomWidth:1,
		borderStyle:'solid',
		borderColor:'#ccc'
  },
  logo:{
  	width:120,
  	height:120,
  	borderRadius:20
  },
  right:{
  	marginLeft:10
  },
  name:{
  		marginBottom:10,
  },
  size:{
  	fontSize:16,
  	color:'yellowgreen'
  }
});