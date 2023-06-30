<template>
	<view class="mine">
		<view class="title">
			<h2>电缆井监测平台</h2>
		</view>
		<view class="login">
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<u--form labelPosition="top" :model="form" :rules="rules" ref="formRef">
				<u-form-item prop="username">
					<u--input class="item" v-model="form.username" placeholder="请输入您的用户名"
						suffixIcon="account"></u--input>
				</u-form-item>
				<u-form-item prop="password">
					<u--input class="item" type="password" v-model="form.password" placeholder="请输入您的密码"
						suffixIcon="lock"></u--input>
				</u-form-item>
				<u-form-item>
					<u-button class="btn" shape="square" type="primary" @click="onSubmit" :loading="loading"
						loadingText="加载">登录</u-button>
				</u-form-item>
				<view class="reg">
					<view @click="onReg">注册</view>
					<view @click="onForget">忘记密码</view>
				</view>
			</u--form>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	const form = reactive({
		username: "",
		password: ""
	})

	const rules = {
		username: [{
			required: true,
			message: '请输入用户名',
			trigger: ['blur', 'change']
		}],
		password: [{
			required: true,
			message: '密码不能为空',
			trigger: 'blur'
		}],
	}
	const loading = ref(false)
	const formRef = ref()
	const onReg = () => {
		uni.showToast({
			title: "该功能还已关闭",
			icon: "error",
			duration: 2000
		})
		// uni.navigateTo({
		// 	url: "/pages/login/register"
		// })
	}
	const onForget = () => {
		uni.showToast({
			title: "该功能还未开发",
			icon: "error",
			duration: 2000
		})
		// uni.$u.toast("该功能还未开发。。")
	}
	const onSubmit = () => {
		// formRef.value.validate((valid,fields)=>{
		// 	if (valid) {
		// 		 console.log('success submit!')
		// 	} else {
		// 	    console.log('error submit!', fields)
		// 	}
		// }) 
		if (form.username == '' || form.password == '') {
			uni.$u.toast('请输入用户名/密码')
			return false;
		}
		loading.value = true
		uni.request({
			// #ifdef H5 
			url: 'api/login/',
			//#endif
			// #ifdef MP-WEIXIN || APP-PLUS
			url: 'https://wzmzero.top/api/login/',
			//#endif
			method: 'POST',
			data: {
				username: form.username,
				password: form.password
			},
			success: (res) => {
				if (res.data.code == 100) {
					console.log("success")
					uni.$u.toast(form.username + ',欢迎')
					uni.switchTab({
						url: '/pages/home/home'
					});
				}
				if (res.data.code == 101) {
					uni.$u.toast('用户名或密码错误')
				}
			},
			fail: (err) => {
				console.log("faild")
			},
			complete: () => {
				loading.value = false
			}
		})

	}
</script>

<style scoped lang="scss">
	.mine {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100vh;
		align-items: center;

		// background-image: $login_base64_code;
		.title {
			width: 100%;
			height: 250rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.login {
			background-color: #f3f4f6;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 12px;
			padding: 20px;
			box-shadow: 2px 2px 3px 2px #c8c9cc;

			.reg {
				color: #909399;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>