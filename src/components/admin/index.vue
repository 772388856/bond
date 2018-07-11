<template>
	<div class="admin">
		<!-- 顶部 -->
		<div class="header-two">
			<a href="javascript:;" class="left fl link-default">
				<h1 class="logo"><img src="../../assets/images/common/logo2.jpg" /></h1>
				<span class="line">|</span>
				<span class="text">基金理财服务管理平台</span>
			</a>
			<div class="right fr">
				<a href="javascript:;" class="item icon-1 admin-icon">
					<span class="num">6</span>
				</a>
				<a href="javascript:;" class="item icon-2 admin-icon">
					<span class="num">98</span>
				</a>
				<a href="javascript:;" class="item icon-3 admin-icon"></a>
				<a href="javascript:;" class="item icon-4 admin-icon"></a>
			</div>
		</div>

		<!-- 左侧 -->
		<div class="admin-left">
			<div class="user-info" style="background-image: url(../../src/assets/images/page/admin/head.jpg)">
				<div class="info">
					<p>{{ adminInfo.userName }}</p>
				</div>
			</div>
			<div class="menu">
				<router-link :to="list.href" class="menu-list" v-for="(list, index) in menuList">
					<i class="icon admin-icon icon-4"></i>
					{{ list.name }}
					<span class="num" v-if="list.num">{{ list.num }}</span>
				</router-link>
			</div>
		</div>

		<!-- 右侧 -->
		<keep-alive>
		    <router-view class="admin-right"></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import {mapActions, mapState} from 'vuex';

    export default {
        name: 'admin',
        data(){
        	return {
        		menuList: [
        			{
        				name: '优选基金管理',
        				href: '/admin/optimization'
        			},
        			{
        				name: '基金组合管理',
        				href: '/admin/combination'
        			},
        			{
        				name: '基金组合标签管理',
        				href: '/admin/label'
        			},
        			{
        				name: '黑名单管理',
        				href: '/admin/blacklist',
        				num: 99
        			},
        			{
        				name: '基金预警管理',
        				href: '/admin/warning'
        			}
        		]
        	}
        },
        computed: {
			...mapState(['adminInfo']),
		}
    }
</script>

<style lang="scss">
	body {
		background: #ebecf2;
	}
	.admin-icon {
		background-image: url(../../assets/images/page/admin/admin_icon.png);
	}
	.admin {
		.header-two {
			min-width: 1000px;
			height: 60px;
			background: #363f45;
			position: relative;
			z-index: 2;

			.left {
				color: #ffffff;
				font-size: 20px;
				margin-left: 28px;
			}
			.logo img {
				display: inline-block;
				height: 60px;
			}
			.left .line {
				margin: 0 10px;
				font-size: 18px;
			}
			.text {
				font-weight: bold;
			}
			.left > * {
				display: inline-block;
				vertical-align: middle;
			}
			.right {
				padding-right: 10px;
				.item {
			    	display: inline-block;
			    	width: 40px;
			    	height: 40px;
			    	border-radius: 2px;
			    	position: relative;
			    	margin-top: 10px;
			    	margin-left: 10px;

			    	&:hover {
			    		background-color: rgba(233, 233, 233, .1);
			    	}
			    }
			    .num {
			    	position: absolute;
			    	right: 0;
			    	top: -2px;
			    	color: #FFF;
			    	background: #fe5621;
			    	width: 20px;
			    	min-height: 20px;
			    	line-height: 20px;
			    	text-align: center;
			    	font-size: 14px;
			    	border-radius: 100px;
			    }
			    .icon-1 {
			    	background-position: 0 0;
			    }
			    .icon-2 {
			    	background-position: -40px 0;
			    }
			    .icon-3 {
			    	background-position: -80px 0;
			    }
			    .icon-4 {
			    	background-position: -120px 0;
			    }
			}
		}
		.admin-left {
			position: absolute;
			top: 60px;
			z-index: 2;
			width: 210px;
			background: #FFF;
			overflow-x: hidden;
		    left: 0;
		    bottom: 0;

			.user-info {
				position: relative;
				width: 210px;
				height: 210px;

				.info {
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					width: 191px;
					padding-left: 19px;
					padding-bottom: 12px;
					color: #FFF;
					font-size: 16px;
					background-image: linear-gradient(bottom, rgba(0,0,0,.5), transparent); 
				}
				p {
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
			.menu {
				a {
					position: relative;
					display: block;
					line-height: 48px;
					border-bottom: 1px solid #e6e7ed;
					font-weight: bold;
					padding-left: 56px;
					&.router-link-active,
					&:hover {
						color: #fe5621;
						background: #f2f9ff;

						.icon-1 {
							background-position: 0 -80px;
						}
						.icon-2 {
							background-position: -40px -80px;
						}
						.icon-3 {
							background-position: -80px -80px;
						}
						.icon-4 {
							background-position: -120px -80px;
						}
						.num {
							color: #fe5621;
						}
					}
				}
				.icon {
					position: absolute;
					width: 40px;
					height: 40px;
					left: 8px;
					top: 3px;
					transition: .2s;
				}
				.icon-1 {
					background-position: 0 -40px;
				}
				.icon-2 {
					background-position: -40px -40px;
				}
				.icon-3 {
					background-position: -80px -40px;
				}
				.icon-4 {
					background-position: -120px -40px;
				}
				.num {
					margin-left: 2px;
					color: #9da2a6;
				}
			}
		}
		.admin-right {
			position: absolute;
			top: 60px;
			left: 235px;
			right: 24px;
			bottom: 0;
			padding-bottom: 20px;
			min-width: 739px;
		    overflow: hidden;
		    overflow-y: auto;
		}
		.admin-box {
			margin-top: 15px;
			background: #FFF;
		}
		.condition-item {
			padding: 18px 24px;
			padding-top: 0;

			.admin-select {
				margin-right: 3px;
			}
		}
		.condition-search {
			position: relative;
			display: inline-block;
			width: 46px;
			height: 46px;
			line-height: 46px;
			text-align: center;
			background-color: #f4ad49;
			border-radius: 5px;
			vertical-align: bottom;
			box-shadow: 0 2px 0 #c38a3a;
			margin-left: 5px;

			i {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				width: 40px;
				height: 40px;
				background-position: -120px 0;
			}
			&:hover {
				opacity: .8;
			}
		}
		.condition-reset {
			font-size: 20px;
			color: #593442;
			vertical-align: bottom;
			margin-left: 5px;
			display: inline-block;
			margin-bottom: -5px;
		}
		.list-tab {
			margin-top: 10px;
			margin-bottom: 10px;
			padding: 0 15px;
			font-size: 18px;
			.left {
				.text {
					font-size: 18px;
					color: #919599;
					line-height: 38px;
				}
				.s-box {
					position: relative;
					margin-left: 8px;
				}
				.s-icon {
					position: absolute;
					width: 32px;
					height: 31px;
					right: 3px;
					top: 2px;
					background-color: #f4ad49;
					border-radius: 5px;
					box-shadow: 0 2px 0 #c38a3a;
					background-position: -123px -4px;
				}
				.s-input {
					color: #563743;
					font-size: 15px;
					border: 1px solid #ddd7d9;
					border-radius: 5px;
					height: 36px;
					padding: 0 8px;
					width: 130px;
					padding-right: 40px;
				}
			}
			.btn {
				display: inline-block;
				width: 94px;
				height: 28px;
				line-height: 28px;
				text-align: center;
				color: #FFF;
				border-radius: 5px;
				box-shadow: 0 2px 0 #af4451;
				background: #db5565;
				margin-left: 10px;
				margin-top: 4px;
				
				&:hover {
					opacity: .8;
				}
			}
		}
		.top-label {
			.item {
				width: 333px;
				height: 108px;
				line-height: 108px;
				color: #FFF;
				font-size: 30px;
				font-weight: bold;
				padding-left: 35px;
				margin-right: 24px;
				position: relative;
			}
			.item-1 {
				background: #fec006;
			}
			.item-2 {
				background: #2095f2;
			}
			.icon-box {
				width: 110px;
				height: 100%;
				top: 0;
				right: 0;
				position: absolute;
				background: rgba(0,0,0,.05);
			}
			.icon {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				width: 40px;
				height: 40px;
			}
			.icon-1 {
				background-position: -40px -120px;
			}
			.icon-2 {
				background-position: -80px -120px;
			}
		}
	}
</style>
