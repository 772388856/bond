<template>
	<div class="admin-table">
		<table>
			<thead>
				<tr>
					<td v-for="(list,index) in title">{{ list }}</td>
					<td v-if="modify">操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(list,index) in lists">
					<td v-for="item in list">{{ item }}</td>
					<td v-if="modify">
						<a href="javascript:;" v-if="typeof showDel != 'undefined'" class="del admin-icon" :class="{
							on: showDel
						}" @click="delFn(list)"></a>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="page">
			<a href="javascript:;" class="up page-item" v-if="page > 1" @click="switchPage(0, 'up')">< 上一页</a>
			<span class="num">
				<!--
				<a href="javascript:;" class="page-item">1</a>
				<span class="spot">...</span>
				<a href="javascript:;" class="page-item active">14</a>
				<a href="javascript:;" class="page-item">15</a>
				<a href="javascript:;" class="page-item">16</a>
				<span class="spot">...</span>
				<a href="javascript:;" class="page-item">98</a>
				-->
				<a href="javascript:;" @click="switchPage(num)" class="page-item" :class="{active: num==page}" v-for="num in indexs">{{ num }}</a>
			</span>
			<a href="javascript:;" class="down page-item" v-if="page < countNum" @click="switchPage(0, 'down')">下一页 ></a>
		</div>
	</div>
</template>

<script>
    export default {
    	props: ['title','lists','showDel','countNum','page', 'modify'],
       	data(){
       		return {
       			indexs: []
       		}
       	},
       	mounted(){
       		this.pageHandle();
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
       				obj.filterHandle();
       			});
       		}
       	},
       	watch: {
       		page(){
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
			padding: 0 10px;
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
					top: 8px;
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
		.page {
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
	}
</style>