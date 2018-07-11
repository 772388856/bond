<template>
	<div class="admin-table">
		<table>
			<thead>
				<tr>
					<td>基金代码</td>
					<td>基金名称</td>
					<td>基金类别</td>
					<td>基金特征</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(list,index) in 10">
					<td>数据{{ list }}</td>
					<td>数据数据数据数据数据数据</td>
					<td>数据数据数据数据数据数据</td>
					<td>数据数据数据数据数据数据</td>
					<td>
						<a href="javascript:;" class="del admin-icon"></a>
					</td>
				</tr>				
			</tbody>
		</table>
		<div class="page">
			<a href="javascript:;" class="up page-item">< 上一页</a>
			<span class="num">
				<a href="javascript:;" class="page-item">1</a>
				<span class="spot">...</span>
				<a href="javascript:;" class="page-item active">14</a>
				<a href="javascript:;" class="page-item">15</a>
				<a href="javascript:;" class="page-item">16</a>
				<span class="spot">...</span>
				<a href="javascript:;" class="page-item">98</a>
			</span>
			<a href="javascript:;" class="down page-item">下一页 ></a>
		</div>
	</div>
</template>

<script>
    export default {
       	data(){
       		return {
       			table: {
       				head: ['基金代码', '基金名称', '基金类别', '基金特征', '操作']
       			}
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
			background-position: 0px -120px;
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