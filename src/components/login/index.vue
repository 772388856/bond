<template>
	<div class="login-page">
		<div class="login-inner header-one clearfix">
			<a href="javascript:;" class="left fl link-default">
				<h1 class="logo"><img src="../../assets/images/common/logo1.jpg" /></h1>
				<span class="line">|</span>
				<span class="text">基金理财服务管理平台</span>
			</a>
			<div class="right fr">
				<a href="javascript:;" class="btn">帮助支持</a>
				<span class="line">|</span>
				<a href="javascript:;" class="btn">登录</a>
				<span class="line">|</span>
				<a href="javascript:;" class="btn">管理中心</a>
			</div>
		</div>

		<div class="login-main">
			<div class="login-inner">
				<form class="login-box" @submit.prevent="submit">
					<div class="title">用户登录</div>
					<div class="item">
						<i class="username-icon icon login-icon"></i>
						<input type="text" v-model="userName" class="input-item" placeholder="请输入用户名" />
					</div>
					<div class="item">
						<i class="pwa-icon icon login-icon"></i>
						<input type="password" v-model="password" class="input-item" placeholder="请输入密码" />
					</div>
					<input class="submit" type="submit" value="登录" />
				</form>
			</div>
		</div>

		<ul class="login-inner login-module clearfix">
			<li>
				<div class="item">
					<i class="item-1 login-icon"></i>
				</div>
				<p class="text">优选基金管理</p>
			</li>
			<li>
				<div class="item">
					<i class="item-2 login-icon"></i>
				</div>
				<p class="text">基金组合管理</p>
			</li>
			<li>
				<div class="item">
					<i class="item-3 login-icon"></i>
				</div>
				<p class="text">基金组合标签管理</p>
			</li>
			<li>
				<div class="item">
					<i class="item-4 login-icon"></i>
				</div>
				<p class="text">黑名单管理</p>
			</li>
			<li>
				<div class="item">
					<i class="item-5 login-icon"></i>
				</div>
				<p class="text">基金预警管理</p>
			</li>
		</ul>
	</div>
</template>

<script>
	import {login} from '../../api/getData';
	import {mapActions, mapState} from 'vuex';

    export default {
        name: 'login',
        data(){
        	return {
        		userName: '',
        		password: ''
        	}
        },
        mounted(){
        	this.getAdminData(() => {
				this.$router.push('/admin');
			});
        },
        methods: {
        	...mapActions(['setAdminData', 'getAdminData']),
        	async submit(){
        		if(!this.userName) {
        			layer.tips('用户名不能为空', '.username-icon', {
						tips: 1,
						tipsMore: true
					});
        		}

        		if(!this.password) {
        			layer.tips('密码不能为空', '.pwa-icon', {
						tips: 1,
						tipsMore: true
					});
        		}

        		if(this.userName && this.password){
	        		const l = layer.msg('登录中...', {
						icon: 16,
						time: 0
					});

					const loginRes = await login({userName: this.userName, password: this.password});

					if(loginRes.statusError && loginRes.status != 200){
						layer.close(l);
						layer.msg('出现异常');
						return false;
					}

					if(loginRes.responseCode == '20000'){
						const userId = loginRes.data && loginRes.data.userId;

						if(userId){
							this.setAdminData({
			        			userId: loginRes.data.userId,
			        			userName: loginRes.data.userName
			        		});

							layer.close(l);
							layer.msg('登录成功');
							setTimeout(() => {
								this.$router.push('/admin');
							}, 1000);
						}else{
							layer.close(l);
							layer.msg('数据异常, 请刷新');
						}
					}else{
						layer.close(l);
						layer.msg(loginRes.msg);
					}
				}
        	}
        }
    }
</script>

<style lang="scss">
	.login-page {
		background: #FFF;
		.login-inner {
			position: relative;
			max-width: 1383px;
			min-width: 900px;
			margin: 0 auto;
		}
		.header-one {
			max-width: 1283px;
			min-width: 800px;
			height: 50px;
			line-height: 50px;
			background: #FFF;
			overflow: hidden;
			padding: 0 50px;
		}
		.header-one .left {
			font-size: 20px;
		}
		.header-one .left > * {
			display: inline-block;
			vertical-align: middle;
		}
		.header-one .logo img {
			display: inline-block;
			height: 50px;
		}
		.header-one .left .line {
			margin: 0 10px;
			font-size: 18px;
		}
		.header-one .text {
			font-weight: bold;
		}
		.header-one .right .line {
			margin: 0 6px;
		}
		.login-main{
			height: 605px;
			min-width: 900px;
			background: url(../../assets/images/page/login/banner.jpg) center center no-repeat;
		}
		.login-box {
			position: absolute;
			top: 132px;
			right: 50px;
			width: 340px;
			min-height: 300px;
			padding: 20px 28px;
			background: #f1f1f1;
			box-shadow: 0 0 5px #f1f1f1;
		}
		.login-box .icon {
			position: absolute;
			top: 3px;
			left: 6px;
			width: 40px;
			height: 40px;
		}
		.login-box .username-icon {
			background-position: 0 0;
		}
		.login-box .pwa-icon {
			background-position: -40px 0;
		}
		.login-box .title {
			font-size: 24px;
			color: #179efd;
		}
		.login-box .submit {
			display: block;
			width: 340px;
			height: 50px;
			margin-top: 38px;
			background: #189ffe;
			color: #FFF;
			font-size: 20px;
			border: none;
		}
		.login-box .item {
			position: relative;
			margin-top: 22px;
		}
		.login-box .input-item {
			border: none;
			display: block;
			width: 274px;
			height: 22px;
			font-size: 16px;
			padding: 12px 10px;
			padding-left: 55px;
		}
		.login-module {
			padding: 40px 0;
		}
		.login-module li {
			width: 20%;
			text-align: center;
			float: left;
		}
		.login-module .item {
			position: relative;
			width: 124px;
			height: 124px;
			border: 1px solid #cfcfcf;
			border-radius: 100%;
			margin: 0 auto;
		}
		.login-module .item i {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 70px;
			height: 70px;
		}
		.login-module .item-1 {
			background-position: 0 -40px;
		}
		.login-module .item-2 {
			background-position: -70px -40px;
		}
		.login-module .item-3 {
			background-position: -140px -40px;
		}
		.login-module .item-4 {
			background-position: -210px -40px;
		}
		.login-module .item-5 {
			background-position: -280px -40px;
		}
		.login-module .text {
			font-size: 16px;
			margin-top: 38px;
		}
		.login-icon {
			background: url(../../assets/images/page/login/login_icon.png);
		}
	}
</style>