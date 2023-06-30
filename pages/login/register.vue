<template>
	<view class="mine">
		<view class="title animate__animated animate__slideInUp">
			<h3>注册界面</h3>
		</view>
		<view class="login">
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<u--form labelPosition="top" :model="form" :rules="rules" ref="formRef">
				<u-form-item prop="username">
					<u--input class="item" v-model="form.username"  placeholder="请输入您的用户名" suffixIcon="account"></u--input>
				</u-form-item>
				<u-form-item prop="password">
					<u--input class="item" type="password" v-model="form.password"  placeholder="请输入您的密码"
						suffixIcon="lock"></u--input>
				</u-form-item>
<!-- 				<u-form-item prop="phone">
					<u--input class="item"  v-model="form.phone"  placeholder="请输入您的手机号"
						suffixIcon="lock"></u--input>
				</u-form-item> -->
				<u-form-item  prop="verify">
					<u--input class="item" v-model="form.verify" placeholder="请输入验证码"
						suffixIcon="lock"></u--input>
				</u-form-item>
				<u-button class="btn" shape="circle" type="primary" @click="onSubmit" :loading="loading"
					loadingText="加载">提交注册</u-button>
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
		phone: [{
			required: true,
			message: '手机号不能为空',
			trigger: 'blur'
		}],
		verify: [{
			required: true,
			message: '验证码不能为空',
			trigger: 'blur'
		}],
	}
	const loading = ref(false)
	const formRef = ref()

	const onSubmit = () => {
		// formRef.value.validate((valid,fields)=>{
		// 	if (valid) {
		// 		 console.log('success submit!')
		// 	} else {
		// 	    console.log('error submit!', fields)
		// 	}
		// }) 
		if (form.username == '' || form.password == ''|| form.phone == ''|| form.verify == '') {
			uni.$u.toast('请输入完整信息')
			return false;
		}
		loading.value = true
		uni.request({
			url: 'https://wzmzero.top/api/reg/',
			method: 'POST',
			data: {
				username: form.username,
				password: form.password,
			},
			success: (res) => {
				if (res.data.code == 100) {
					uni.$u.toast(form.username + ',注册成功')
					uni.navigateTo({
						url:"/pages/login/index"
					})
				}
				else{
					uni.$u.toast(res.data.msg)
				}
			},
			fail: (err) => {
				uni.$u.toast("请求发送失败")
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
			border-radius:12px;
			padding: 20px;
			box-shadow: 2px 2px 3px 2px #c8c9cc; 
			.btn{
				width: 40%;
			}
		}
	}
</style>