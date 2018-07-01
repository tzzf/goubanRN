import React from 'react'
// 导入View 和 Text组件  来自与react-native
import {View,Text} from 'react-native'
// 导入Actions组件 是路由的组件用来实现跳转到某个路由的键
import {Actions} from 'react-native-router-flux';
export default class AboutComponent extends React.Component{
	render(){
		return <View>
			<Text>关于页面</Text>
		</View>
	}
}