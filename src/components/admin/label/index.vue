<template>
	<div v-if="!load">
		<top-title>基金组合标签管理</top-title>

		<div class="top-label clearfix">
			<a href="javascript:;" class="item-1 item fl">
				<form id="upload" enctype='multipart/form-data'>
					<div>基金标签上传</div>
					<div class="icon-box">
						<i class="icon-1 icon admin-icon"></i>
					</div>
					<input class="file" name="file" type="file" @change="upload" />
				</form>
			</a>
		</div>
	</div>
</template>

<script>
	import topTitle from '../common/topTitle'
	import topText from '../common/topText'
	import boxTitle from '../common/boxTitle'
	import mySelect from '../common/select'
	import myTable from '../common/table'
	import {fundgroupsTagsUpload} from '../../../api/getData';

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
        	},
        	upload(){
        		const l = layer.msg('文件正在上传中，请稍候', {
					icon: 16,
					shade: 0.5,
					time: 0
				});

				$.ajax({
				    url: fundgroupsTagsUpload,
				    type: 'POST',
				    cache: false,	
				    data: new FormData(document.getElementById('upload')),
				    processData: false,
				    contentType: false,
				    dataType:"json",
				    success: (data) => {
				        layer.close(l);
				        if(data.responseCode == '20000'){
				        	layer.msg('上传成功');
				        }else{
				        	layer.msg(data.msg);
				        }
				    },
				    error: () => {
				    	layer.close(l);
						layer.msg('出现异常');
				    }
				});
        	}
        }
    }
</script>