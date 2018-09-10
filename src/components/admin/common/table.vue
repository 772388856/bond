<template>
	<div class="admin-table">
		<table>
			<thead>
				<tr>
					<td v-for="(list,index) in title">{{ list }}</td>
					<td v-if="modify">{{ modifyText ? modifyText : '操作' }}</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(list,index) in lists">
					<td v-for="(item, key, index) in list" 
						v-if="key != 'operationVal'"
						:class="[
							{cursor: type == 'combination' && (key == 'date' || key == 'reason')},
							`td_${index+1}`
						]"
						@click="openText(type == 'combination' && (key == 'date' || key == 'reason'), item)"
					>
						<template v-if="long">
							{{ item | strLength }}
						</template>
						<template v-else>
							{{ item }}
						</template>
					</td>

					<td v-if="modify">
						<!-- 删除 -->
						<a href="javascript:;" v-if="typeof showDel != 'undefined'" class="del admin-icon" :class="{
							on: showDel
						}" @click="delFn(list)"></a>

						<!-- 搜索 -->
						<a href="javascript:;" class="search admin-icon" @click="searchHandle(list)" v-if="search"></a>

						<!-- 单选 -->
						<a href="javascript:;" @click="radioFn(list, index)" :class="{on: list.operationVal == 1}" v-if="type == 'tips' || type == 'warning'" class="radio admin-icon"></a>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-if="!lists.length" class="no-table">没有数据</div>
		<div class="page" v-if="lists.length">
			<a href="javascript:;" class="up page-item" v-if="page > 1" @click="switchPage(0, 'up')">< 上一页</a>
			<span class="num">
				<template v-if="page > 3 && countNum > 5">
					<a href="javascript:;" class="page-item" @click="switchPage(1)">1</a>
					<span class="spot">...</span>
				</template>

				<a href="javascript:;" @click="switchPage(num)" class="page-item" :class="{active: num==page}" v-for="num in indexs">{{ num }}</a>

				<template v-if="page < countNum-5">
					<span class="spot">...</span>
					<a href="javascript:;" class="page-item" @click="switchPage(countNum)">{{ countNum }}</a>
				</template>
			</span>
			<a href="javascript:;" class="down page-item" v-if="page < countNum" @click="switchPage(0, 'down')">下一页 ></a>

			<!-- 全选 -->
			<div class="radio-all" v-if="modify && (type == 'tips' || type == 'warning')">
				<span>整页操作：</span><a href="javascript:;" @click="radioAllFn" :class="{on: radioAll}" class="radio admin-icon"></a>
			</div>
		</div>
	</div>
</template>

<script>
	import {fundgroupsQuery} from '../../../api/getData';
	import {stateHandle} from '../../../config/tool';

    export default {
    	props: ['title','lists','showDel','countNum','page', 'modify', 'search', 'type', 'modifyText', 'radioAll', 'long'],
       	data(){
       		return {
       			indexs: []
       		}
       	},
       	mounted(){
       		this.pageHandle();
       	},
       	filters: {
       		strLength(str){
       			if(!str) return str;

       			const newStr = str.toString();

       			if(newStr.length > 30){
       				return newStr.substr(0, 30) + '...';
       			}else{
       				return str;
       			}
       		}
       	},
       	methods: {
       		delFn(val){
       			if(!this.showDel) return false;

       			let l = layer.confirm('您是否删除本条目？', {
					btn: ['确定','取消'],
					title: false,
					skin: 'layui-layer-molv' 
				}, () => {
					this.$emit('updateData', obj => {
						obj.removeData(val);
					})
				})
       		},
       		pageHandle(){
       			let left = 1;
				let right = this.countNum;
				let ar = [];
				if(this.countNum>= 5){
					if(this.page > 3 && this.page < this.countNum-2){
						left = this.page - 2
						right = this.page + 2
					}else{
					    if(this.page<=3){
					        left = 1
					        right = 5
					    }else{
					        right = this.countNum
					        left = this.countNum -4
					    }
					}
				}
		        while (left <= right){
		            ar.push(left)
		            left ++
		        }
		        this.indexs = ar;
       		},
       		switchPage(n, type){
       			let num = n;
       			if(type == 'down'){ // 下一页
       				num = this.page+1;
       			}else if(type == 'up'){ // 上一页
       				num = this.page-1;
       			}

       			this.$emit('updateData', obj => {
       				obj.page = num;
       				obj.filterHandle(() => {}, {
       					type: 'page'
       				});
       			});
       		},
       		async searchHandle(list){
       			let l;

       			l = layer.msg('搜索中', {
					icon: 16,
					shade: 0.5,
					time: 0
				});

       			const res = await fundgroupsQuery(list.code);

       			stateHandle({
					data: res,
					codeSuccess: () => {
						layer.close(l);

						let h = '', noData = '';

						res.data.forEach((list, index) => {
							h += `
								<tr>
									<td>${list.code}</td>
									<td>${list.name}</td>
									<td>${list.seq}</td>
									<td>${list.proportion.toFixed(2)}%</td>
								</tr>
							`
						});

						if(!res.data.length){
							noData = `<div style="text-align: center; line-height: 100px;">暂无信息</div>`
						}

						layer.open({
							type: 1,
							shade: false,
							title: false,
							shade: 0.3,
							skin: 'layui-layer-molv',
							maxWidth: 800,
							maxHeight: 600,
							content: `
								<table class="search-table">
									<thead>
										<tr>
											<td>基金代码</td>
											<td>基金名称</td>
											<td>基金序号</td>
											<td>基金比例</td>
										</tr>
									</thead>
									<tbody>
										${h}
									</tbody>
								</table>
								${noData}
							`
						});
					}
				});
       		},
       		openText(info, text){
       			if(!info) return false;

       			layer.open({
					type: 1,
					shade: false,
					title: false,
					shade: 0.3,
					skin: 'layui-layer-molv',
					content: `
						<div style="padding: 30px;">${text}</div>
					`
				});
       		},
       		radioFn(val, inx){
				this.$emit('updateData', obj => {
					obj.radioFn(val, inx);
				})
       		},
       		radioAllFn(){
       			this.$emit('updateData', obj => {
					obj.radioAllFn();
				})
       		}
       	},
       	watch: {
       		page(){
       			this.pageHandle();
       		},
       		countNum(){
       			this.pageHandle();
       		}
       	}
    }
</script>

<style lang="scss">
	.admin-table {
		table {
			width: 100%;
			text-align: center;
			border-top: 1px solid #ebecf2;
		}
		td {
			height: 56px;
			border-bottom: 1px solid #ebecf2;
			padding: 10px 10px;
			min-width: 80px;
		}
		thead {
			td {
				position: relative;
				font-size: 20px;
				&:first-child {
					color: #f4ad49;
				}
				&:last-child {
					&:after {
						display: none;
					}
				}
				&:after {
					position: absolute;
					content: "";
					width: 1px;
					height: 40px;
					background: #ded6d9;
					right: 0;
					top: 50%;
					margin-top: -20px;
				}
			}
		}
		tbody {
			·color: #919599;
			td {
				font-size: 18px;
			}
			tr {
				transition: .3s;
				&:hover {
					background: #f1f1f1;
					color: #194161;
				}
			}
		}
		.del {
			display: inline-block;
			width: 40px;
			height: 40px;
			background-position: 0px -160px;
			&.on {
				background-position: 0px -120px;
			}
		}
		.search {
			display: inline-block;
			width: 40px;
			height: 40px;
			background-position: -120px -160px;
		}
		.radio {
			display: inline-block;
			width: 80px;
			height: 40px;
			background-position: -80px -200px;

			&.on {
				background-position: 0 -200px;
			}
		}
		.page {
			overflow: hidden;
			padding: 10px 20px;
			* {
				display: inline-block;
			}
			.page-item {
				height: 40px;
				line-height: 40px;
				padding: 0 12px;
				min-width: 20px;
				border-radius: 5px;
				box-shadow: 0 2px 0 #FFF;
				text-align: center;
				&.active,
				&:hover {
					background: #0bacd3;
					color: #FFF;
					box-shadow: 0 2px 0 #098aa9;
				}
			}
			.up,.down {
				font-size: 18px;
				font-weight: bold;
				position: relative;
				&:after {
					position: absolute;
					content: "";
					width: 1px;
					height: 100%;
					background: #ded6d9;
					top: 0;
				}
			}
			.up {
				margin-right: 10px;
				&:after {
					right: -5px;
				}
			}
			.down {
				margin-left: 10px;
				&:after {
					left: -5px;
				}
			}
			.num {
				* {
					font-size: 17px;
					margin: 0 2px;
				}
			}
		}
		.cursor {
			cursor: pointer;
		}
		.no-table {
		    text-align: center;
		    height: 300px;
		    line-height: 300px;
		    font-size: 18px;
		}
		.radio-all {
			float: right;
			line-height: 40px;
			font-size: 18px;
			& > * {
				display: inline-block;
				vertical-align: middle;
			}
			span {
				margin-right: -10px;
			}
		}
	}
	.search-table {
		thead {
			font-weight: bold;
		}
		td {
			padding: 10px;
			text-align: center;
			border-bottom: 1px solid #ebecf2;
		}
	}
</style>