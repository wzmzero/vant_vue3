<template>
	<view class="title">
		<h2>MQTT数据</h2>
	</view>
	
	<view>
		<u-row justify="around" customStyle="padding: 10px">
			<u-col span="5">
				<view class="demo-layout" :class="{ active: isActive,erractive: !isActive}">
					<h2>温度:</h2>
					  <br/>
					<h3>{{sub.temper}} C</h3>
				</view>
			</u-col>
			<u-col span="5">
				<view class="demo-layout" :class="{ active: isActive,erractive: !isActive}">
					<h2>湿度:</h2>
					 <br/>
					<h3>{{sub.hum}} %</h3>
					
				</view>
			</u-col>
		</u-row>
		<u-row justify="around" customStyle="padding: 10px">
			<u-col span="5">
				<view class="demo-layout" :class="{ active: isActive,erractive: !isActive}">
					<h2>气体浓度:</h2>
					  <br/>
					<h3>{{sub.co}} ppm</h3>
				</view>
			</u-col>
			<u-col span="5">
				<view class="demo-layout" :class="{ active: isActive,erractive: !isActive}">
					<h2>开关</h2>
					<br/>
					<u-switch v-model="swValue" :disabled="!isActive" :loading="swLoad" @change="change"></u-switch>
				</view>
			</u-col>
		</u-row>
	</view>

<!-- 	<u--input v-model="mqtt_pub"></u--input>>
	<u-button @click="pub">提交</u-button> -->
	<view>{{time}}</view>
	<button @click="conneting">连接</button>
	<button @click="disconneting">断开连接</button>
</template>

<script setup>
	import * as mqtt from "mqtt/dist/mqtt"
	import {
		ref,
		reactive,
		watch
	} from 'vue'
	// 连接选项
	const swValue = ref(false)
	const swLoad = ref(false)
	const swGoal = ref(false)
	const change = (e)=>{
		// console.log(e)
		if(isActive.value== true){
		client.value.publish('/topic/2', e.toString(), {
			qos: 1
		})
		swLoad.value=true
		swGoal.value=e
		}
	}
	setInterval(()=>{
		if(sub.value.swi!=undefined){
		if(swGoal.value==sub.value.swi){
			swLoad.value=false
		}
		else{	
			client.value.publish('/topic/2',swGoal.value.toString(), {
			qos: 1
		})}
		// console.log(sub.value.swi)
	
}
	},1000)
	const options = {
		clean: true, // true: 清除会话, false: 保留会话
		connectTimeout: 4000, // 超时时间
		// 认证信息
		clientId: 'emqx_test',
		username: 'emqx_test',
		password: 'emqx_test',
	}
	// #ifdef H5 
	const connectUrl = 'wss://wzmzero.top/mqtt'
	//#endif
	// #ifdef MP-WEIXIN || APP-PLUS
	const connectUrl = 'wxs://wzmzero.top/mqtt'
	//#endif
	const isActive = ref(false)
	const client = ref(null)
	const conneting = ()=>{
		client.value = mqtt.connect(connectUrl, options)
		client.value.subscribe('/topic/1')
		client.value.on('connect', function() {
			isActive.value= true
		})
		client.value.on('error',()=>{
			isActive.value= false
		})
		client.value.on('message', (topic, message) => {
			sub.value =JSON.parse(message.toString()) 
			if(swLoad.value==false){
			swValue.value=sub.value.swi}
		})
	}
	const disconneting = ()=>{
		if(client.value!==null){
		client.value.end()
		isActive.value= false
		swLoad.value=false	
		}
	}
	const sub = ref('')
	const mqtt_pub = ref('')
	const time = ref('')
	watch(sub, () => {
		time.value = new Date()
	})
	const pub = () => {
		client.value.publish('/topic/3', mqtt_pub.value, {
			qos: 1
		})
	}
</script>

<style scoped>
	.btn {
		font-size: 30px;
		display: flex;
		justify-content: center;
	}
	.active{
		background-color: #f4f4f5;
	}
	.erractive{background-color: #c8c9cc;
		
	}
	.demo-layout {
		height: 240rpx;
		border-radius: 12px;
		padding: 20px;
		box-shadow: 2px 2px 3px 2px #c8c9cc
	}
	
	.title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5%;
	}
</style>