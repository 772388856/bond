<template>
	<div v-if="!load">
		<top-title>基金组合标签管理</top-title>

		<div class="top-label clearfix">
			<a href="javascript:;" class="item-1 item fl">
				<div>基金组合上传</div>
				<div class="icon-box">
					<i class="icon-1 icon admin-icon"></i>
				</div>
				<input class="file" type="file" />
			</a>
			<a href="javascript:;" class="item-2 item fl" @click="showDel = !showDel">
				<div>基金组合编辑</div>
				<div class="icon-box">
					<i class="icon-2 icon admin-icon"></i>
				</div>
			</a>
		</div>

		<div class="admin-box">
			<box-title title="优选基金搜索"></box-title>
			<div class="condition-item">
				<my-select :lists="['规模风格', '规模风格1', '规模风格2', '规模风格3']"></my-select>
				<my-select :lists="['价值风格', '价值风格1', '价值风格2', '价值风格3']"></my-select>
				<my-select :lists="['热门主题', '热门主题1', '热门主题2', '热门主题3']"></my-select>
				<a href="javascript:;" class="condition-search" @click="filterFn">
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
						<input type="text" v-model="codeVal" class="s-input" placeholder="请输入基金代码" />
						<a href="javascript:;" class="s-icon admin-icon" @click="searchCode"></a>
					</div>
				</div>
				<div class="right fr">
					<a href="javascript:;" class="btn" download="test">表单下载</a>
				</div>
			</div>
			<my-table :showDel="showDel"></my-table>
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
        components: { topTitle, topText, boxTitle, mySelect, myTable },
        data(){
        	return {
        		showDel: false,
        		codeVal: '',
        		load: true
        	}
        },
        created(){
			this.layerLoad = layer.msg('加载数据中...', {
				icon: 16,
				shade: 0,
				time: 0
			});

			setTimeout(() => {
				layer.close(this.layerLoad);
				this.load = false;
			}, 1000);
		},
        methods: {
        	filterFn(){
        		layer.msg('搜索中', {
					icon: 16,
					shade: 0.5
				});
        	},
        	searchCode(){
        		if(!this.codeVal){
        			layer.tips('基金代码不能为空', '.s-input', {
						tips: 1
					});
        			return false;
        		}

        		layer.msg('搜索中', {
					icon: 16,
					shade: 0.5
				});
        	}
        }
    }
</script>