<template>
	<div>
		<top-title>基金组合管理</top-title>

		<div class="top-label clearfix">
			<a href="javascript:;" class="item-1 item fl">
				<div>基金组合上传</div>
				<div class="icon-box">
					<i class="icon-1 icon admin-icon"></i>
				</div>
			</a>
			<a href="javascript:;" class="item-2 item fl">
				<div>基金组合编辑</div>
				<div class="icon-box">
					<i class="icon-2 icon admin-icon"></i>
				</div>
			</a>
		</div>

		<div class="admin-box">
			<box-title title="优选基金搜索"></box-title>
			<div class="condition-item">
				<my-select :lists="['规模风格']"></my-select>
				<my-select :lists="['价值风格']"></my-select>
				<my-select :lists="['热门主题']"></my-select>
				<a href="javascript:;" class="condition-search">
					<i class="admin-icon"></i>
				</a>
				<a href="javascript:;" class="condition-reset">重置所有条件</a>
			</div>
		</div>

		<div class="admin-box">
			<box-title title="共找到XX个符合条件的结果"></box-title>
			<div class="list-tab clearfix">
				<div class="left fl">
					<div class="text fl">基金代码搜索</div>
					<div class="s-box fl">
						<input type="text" class="s-input" placeholder="请输入基金代码" />
						<a href="javascript:;" class="s-icon admin-icon"></a>
					</div>
				</div>
				<div class="right fr">
					<a href="javascript:;" class="btn">表单下载</a>
				</div>
			</div>
			<my-table></my-table>
		</div>
	</div>
</template>

<script>
	import topTitle from '../common/topTitle'
	import topText from '../common/topText'
	import boxTitle from '../common/boxTitle'
	import mySelect from '../common/select'
	import myTable from '../common/table'

    export default {
        name: 'optimization',
        components: { topTitle, topText, boxTitle, mySelect, myTable }
    }
</script>