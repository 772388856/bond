<template>
	<div>
		<top-title>优选基金池特点</top-title>

		<top-text>
			本次优选级基金池的参数为：投资风格<span>“高”</span>，热门主题：<span>“汽车”、“金属”、“科技”</span>，基金评级：<span>五星</span>
		</top-text>

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
					<a href="javascript:;" class="btn">保存</a>
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