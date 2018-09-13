<template>
	<div class="admin" v-if="!load">
		<!-- 顶部 -->
		<div class="header-two">
			<a href="javascript:;" class="left fl link-default">
				<h1 class="logo"><img src="../../assets/images/common/logo2.jpg" /></h1>
				<span class="line">|</span>
				<span class="text">基金理财服务管理平台</span>
			</a>
			<div class="right fr">
				<a href="javascript:;" class="item icon-1 admin-icon" title="站内信" @click="informationHandle">
					<span class="num" v-if="false">6</span>
				</a>
				<a href="javascript:;" class="item icon-5 admin-icon" title="退出" @click="logoutHandle">
					<span class="num" v-if="false">6</span>
				</a>
			</div>
		</div>

		<!-- 左侧 -->
		<div class="admin-left">
			<div class="user-info">
				<img src="../../assets/images/page/admin/head.jpg" />
				<div class="info">
					<p>{{ adminInfo.userName }}</p>
				</div>
			</div>
			<div class="menu">
				<router-link :to="list.href" class="menu-list" v-for="(list, index) in menuList">
					<i class="icon admin-icon icon-4"></i>
					{{ list.name }}
					<span class="num" v-if="list.id == '4' && adminInfo.blacklistCount">{{ adminInfo.blacklistCount }}</span>
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
	import {permission} from '../../api/getData';
	import {fundgroupAlert, logout} from '../../api/getData';
	import {stateHandle} from '../../config/tool';

	window.accMul = function(arg1,arg2){
		if(Object.prototype.toString.call(arg1) != '[object Number]' || Object.prototype.toString.call(arg2) != '[object Number]') return arg1;
		var m=0,s1=arg1.toString(),s2=arg2.toString();
		try{m+=s1.split(".")[1].length}catch(e){}
		try{m+=s2.split(".")[1].length}catch(e){}
		return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
	}

    export default {
        name: 'admin',
        data(){
        	return {
        		menuList: [],
        		load: true,
        		layerLoad: '',
        		alertPage: 1,
        		alertPageSize: 10,
        		alertCount: 0,
        		alertData: []
        	}
        },
        computed: {
			...mapState(['adminInfo']),
		},
		created(){
			this.layerLoad = layer.msg('初始化数据中，请稍等...', {
				icon: 16,
				shade: 0.3,
				time: 0
			});

			window.informationHandle = this.informationHandle;
		},
		mounted(){
			this.getAdminData(() => {
				this.getPermissions(() => {
					layer.close(this.layerLoad);
					this.load = false;
				});
			});
		},
		methods: {
			...mapActions(['setAdminData','getAdminData']),
			async getPermissions(callback){
				const permissionRes = await permission(this.adminInfo.userId);

				if(permissionRes.statusError && permissionRes.status != 200){
					layer.msg('出现异常');
					return false;
				}

				if(permissionRes.responseCode == '20000'){
					this.setAdminData({
						permissions: permissionRes.data.permissions
	        		});
	        		this.setMenu();
	        		callback && callback();
				}else{
					this.$router.push('/login');
				}
			},
			setMenu(){
				this.adminInfo.permissions.forEach((list, index) => {
					let href;

					switch(list.permissionId) {
						// 优选基金管理
						case 1:
							href = '/admin/optimization';
							break;
						// 基金组合管理
						case 2:
							href = '/admin/combination';
							break;
						// 基金组合标签管理
						case 3:
							href = '/admin/label';
							break;
						// 黑名单管理
						case 4:
							href = '/admin/blacklist';
							break;
						// 基金预警管理
						case 5:
							href = '/admin/warning';
							break;
						// 基金预警管理
						case 6:
							href = '/admin/tips';
							break;
					}

					this.menuList.push({name: list.permissionName, id: list.permissionId, href: href});					
				});
				this.jumpLink();
			},
			jumpLink(){
				let num = 0;

				if(this.$route.path == '/admin'){
					this.menuList[0] && this.menuList[0].href && this.$router.push(this.menuList[0].href);
				}

				this.menuList.forEach((list, index) => {
					if(list.href.indexOf(this.$route.path) != -1){
						num++;
					}
				});
				if(!num){
					this.menuList[0] && this.menuList[0].href && this.$router.push(this.menuList[0].href);
				}
			},
			async informationHandle(type){
				let tdStr = '', noData = '', maxWin = window.innerWidth/4;

				let handle = () => {
					this.alertData.forEach((list, index) => {
						tdStr += `
							<tr>
								<td style="max-width: ${maxWin}px">${list.id}</td>
								<td style="max-width: ${maxWin}px">${list.groupCode}</td>
								<td style="max-width: ${maxWin}px">${list.groupName}</td>
								<td style="max-width: ${maxWin}px">${list.fundCode}</td>
								<td style="max-width: ${maxWin}px">${list.fundName}</td>
								<td style="max-width: ${maxWin}px">${list.fundProportion}</td>
								<td style="max-width: ${maxWin}px">${list.typeId}</td>
								<td style="max-width: ${maxWin}px">${list.typeName}</td>
								<td style="max-width: ${maxWin}px">${list.content}</td>
								<td style="max-width: ${maxWin}px">${list.date}</td>
							</tr>
						`
					});

					if(!this.alertData.length){
						noData = `<div style="text-align: center; line-height: 100px;">暂无信息</div>`;
					}

					layer.open({
						type: 1,
						shade: false,
						title: false,
						shade: 0.3,
						skin: 'layui-layer-molv',
						id: 'informationLayui',
						maxWidth: window.innerWidth-100,
						maxHeight: window.innerHeight-100,
						content: `
							<div class="information-box">
								<table>
									<thead>
										<tr>
											<td>组合预警id</td>
											<td>组合代码</td>
											<td>组合名称</td>
											<td>基金代码</td>
											<td>基金名称</td>
											<td>基金比例</td>
											<td>预警种类id</td>
											<td>预警种类名称</td>
											<td>预警内容</td>
											<td>预警日期</td>
										</tr>
									</thead>
									<tbody id="informationBody">
										${tdStr}
									</tbody>
								</table>
								${noData}
								<div>
									<a href="javascript:;" style="display: none" id="informationMOREBTN1" onclick="informationHandle(0)">上一页</a>
									<a href="javascript:;" style="display: none" id="informationMOREBTN2" onclick="informationHandle(1)">下一页</a>
								</div>
							</div>
						`
					}, () => {

					});
				}

				if(typeof type != 'object'){
					if(type){
						this.alertPage++;
					}else{
						this.alertPage--;
					}
				}
				
				let l = layer.msg('加载中', {
					icon: 16,
					shade: 0.5,
					time: 0
				});

				const res = await fundgroupAlert({
					page: this.alertPage,
        			pageSize: this.alertPageSize
				});

				stateHandle({
					data: res,
					codeSuccess: () => {
						layer.close(l);

						this.alertCount = Math.ceil(res.count / this.alertPageSize);	
						this.alertData = res.data;					

						if(!$('.information-box').length){
							handle();
						}else{
							this.alertData.forEach((list, index) => {
								tdStr += `
									<tr>
										<td style="max-width: ${maxWin}px">${list.id}</td>
										<td style="max-width: ${maxWin}px">${list.groupCode}</td>
										<td style="max-width: ${maxWin}px">${list.groupName}</td>
										<td style="max-width: ${maxWin}px">${list.fundCode}</td>
										<td style="max-width: ${maxWin}px">${list.fundName}</td>
										<td style="max-width: ${maxWin}px">${list.fundProportion}</td>
										<td style="max-width: ${maxWin}px">${list.typeId}</td>
										<td style="max-width: ${maxWin}px">${list.typeName}</td>
										<td style="max-width: ${maxWin}px">${list.content}</td>
										<td style="max-width: ${maxWin}px">${list.date}</td>
									</tr>
								`
							});

							setTimeout(() => {
								$('.layui-layer').width($('.layui-layer').width());
								$('#informationBody').html(tdStr);
								$('.layui-layer').css('top', ($(window).height() - $('#informationLayui').height()) / 2)
							}, 200);
						}

						if(this.alertData.length && this.alertCount && (this.alertPage < this.alertCount)){
							$('#informationMOREBTN2').show();
						}else{
							$('#informationMOREBTN2').hide();
						}
						if(this.alertData.length && this.alertCount && (this.alertPage > 1)){
							$('#informationMOREBTN1').show();
						}else{
							$('#informationMOREBTN1').hide();
						}
					}
				});
			},
			async logoutHandle(){
				let l = layer.msg('正在退出', {
					icon: 16,
					shade: 0.5,
					time: 0
				});

				const res = await logout();

				stateHandle({
					data: res,
					codeSuccess: () => {
						layer.close(l);
						layer.msg('退出成功');
						this.$router.push('/login');
					}
				});
			}
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
				padding-right: 20px;
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
			    .icon-5 {
			    	background-position: -160px -40px;
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
					padding-top: 12px;
					color: #FFF;
					font-size: 16px;
					background-image: linear-gradient(bottom, rgba(0,0,0,.5), transparent); 
				}
				p {
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					margin-right: 10px;
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
			right: 0;
			bottom: 0;
			padding-bottom: 5px;
			padding-right: 20px;
			min-width: 739px;
		    overflow: hidden;
		    overflow-y: auto;
		}
		.admin-box {
			margin-bottom: 15px;
			background: #FFF;
		}
		.condition-item {
			padding: 18px 24px;
			padding-top: 0;

			.admin-select {
				margin-right: 10px;
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
					width: 140px;
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
			margin-bottom: 15px;
			.item {
				width: 30%;
				max-width: 300px;
				height: 108px;
				line-height: 108px;
				color: #FFF;
				font-size: 1.8em;
				font-weight: bold;
				padding-left: 1%;
				margin-right: 2%;
				position: relative;
			}
			.item-1 {
				background: #fec006;

				.file {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: 2;
					opacity: 0;
				}
			}
			.item-2 {
				background: #2095f2;
			}
			.item-3 {
				background: #e81d62;
			}
			.icon-box {
				max-width: 110px;
				width: 30%;
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
			.icon-3 {
				background-position: -120px -120px;
			}
		}
	}
	.information-box {
		padding: 10px;
		text-align: center;

		table {
			width: 100%;
		}
		td {
			padding: 2px 10px;
		}
		thead {
			td {
				font-weight: bold;
			}
		}
		a {
			display: inline-block;
			color: #FFF;
			background: #db5565;
			padding: 6px 40px;
			border-radius: 50px;
			margin-top: 10px;
			margin-left: 10px;
			margin-right: 10px;
		}
	}
</style>
