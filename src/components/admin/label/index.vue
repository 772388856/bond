<template>
	<div v-if="!load">
		<top-title>基金组合标签管理</top-title>

		<div class="top-label clearfix">
			<a href="javascript:;" class="item-1 item fl" v-if="modify">
				<form id="fundgroupsTagsUploadID" enctype='multipart/form-data'>
					<div>基金标签上传</div>
					<div class="icon-box">
						<i class="icon-1 icon admin-icon"></i>
					</div>
					<input class="file" name="file" type="file" @change="upload" />
				</form>
			</a>
			<a :href="fundgroupsTagsDownload" class="item-3 item fl" v-if="view">
				<div>组合标签下载</div>
				<div class="icon-box">
					<i class="icon-3 icon admin-icon"></i>
				</div>
			</a>
		</div>

		<div class="admin-box" v-if="view">
			<box-title title="筛选搜索"></box-title>
			<div class="condition-item">
				<my-select text="风险偏好" keyVal="riskPreferLabel" :lists="riskPreferLabel" @updateData="updateData" :checkbox="true"></my-select>
				<my-select text="流动性偏好" keyVal="fluidityPreferLabel" :lists="fluidityPreferLabel" @updateData="updateData" :checkbox="true"></my-select>
				<a href="javascript:;" class="condition-search" @click="filterHandle">
					<i class="admin-icon"></i>
				</a>
				<a href="javascript:;" class="condition-reset" @click="reset">重置所有条件</a>
			</div>
		</div>

		<div class="admin-box">
			<box-title :title="`共找到${count}个符合条件的结果`"></box-title>
			<div class="list-tab clearfix" v-if="view">
				<div class="left fl">
					<div class="text fl">基金代码搜索</div>
					<div class="s-box fl">
						<input type="text" v-model="codeVal" class="s-input" placeholder="请输入基金代码" />
						<a href="javascript:;" class="s-icon admin-icon" @click="searchCode"></a>
					</div>
				</div>
			</div>
			<my-table 
				:title="['组合代码', '组合名称', '风险偏好', '流动性偏好']" 
				:lists="tagsData | dataSort"
				:countNum="countNum"
				:page="page"
				@updateData="updateData"
				type="combination"
			></my-table>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapState} from 'vuex';
	import topTitle from '../common/topTitle'
	import topText from '../common/topText'
	import boxTitle from '../common/boxTitle'
	import mySelect from '../common/select'
	import myTable from '../common/table'
	import {fundgroupCondition, fundgroupsTagsUpload, fundgroupsTagsDownload, fundgroupTags} from '../../../api/getData';
	import {stateHandle} from '../../../config/tool';

    export default {
        name: 'optimization',
        components: { topTitle, topText, boxTitle, mySelect, myTable },
        data(){
        	return {
        		codeVal: '',
        		load: true,
        		fundgroupsTagsDownload: fundgroupsTagsDownload,
        		pageSize: 10,
        		page: 1,
        		countNum: 0,
        		count: 0,
        		tagsData: [],
        		modify: false,
        		view: false,
        		riskPreferLabel: {
        			default: [],
        			list: []
        		},
        		fluidityPreferLabel: {
        			default: [],
        			list: []
        		}
        	}
        },
        filters: {
        	dataSort(lists){
        		if(!lists.length) return lists;

        		const newData = [];
        		lists.forEach((list, index) => {
        			newData.push({
        				code: list.code,
        				name: list.name,
        				riskPreferLabel: list.riskPrefer,
        				fluidityPreferLabel: list.fluidityPrefer
        			})
        		});

        		return newData;
        	}
        },
        computed: {
			...mapState(['adminInfo']),
		},
        created(){
			const layerLoad = layer.msg('加载数据中...', {
				icon: 16,
				shade: 0,
				time: 0
			});

			this.getData(() => {
    			this.filterHandle(() => {
    				layer.close(layerLoad);
        			this.load = false;
    			});
        	});
		},
		mounted(){
			this.adminInfo.permissions.forEach((list, index) => {
				if(list.permissionId == '3'){
					if(list.modify) this.modify = true;
					if(list.view) this.view = true;
				}
			});
		},
        methods: {
        	// 初始化数据
			async getData(callback){
				const res = await fundgroupCondition();

				stateHandle({
					data: res,
					codeSuccess: () => {
						this.riskPreferLabel.list = res.data.riskPrefer;
						this.fluidityPreferLabel.list = res.data.fluidityPrefer;
					}
				});

				callback && callback();
			},
        	async filterHandle(callback, config={}){
        		let l;

        		config.type != 'page' && (this.page = 1);

        		if(config.tips !== false){
	        		l = layer.msg('搜索中', {
						icon: 16,
						shade: 0.5,
						time: 0
					});
				}
				const str = {
					page: this.page,
					pageSize: this.pageSize
				};

				if(this.riskPreferLabel.default.length){
					let topicArr = [];

					this.riskPreferLabel.default.forEach((list, index) => {
						topicArr.push(list.id);
					});
					str.riskPrefer = topicArr;
				}
				if(this.fluidityPreferLabel.default.length){
					let topicArr = [];

					this.fluidityPreferLabel.default.forEach((list, index) => {
						topicArr.push(list.id);
					});
					str.fluidityPrefer = topicArr;
				}
				if(this.codeVal){
					str.code = this.codeVal;
				}

				const res = await fundgroupTags(str);

				stateHandle({
					data: res,
					codeSuccess: () => {
						this.tagsData = res.data.detail;
						this.countNum = Math.ceil(res.count / this.pageSize);
						this.count = res.count;
						config.tips !== false && layer.close(l);
					}
				});

				typeof callback == 'function' && callback();
        	},
        	searchCode(){
        		if(!this.codeVal){
        			layer.tips('基金代码不能为空', '.s-input', {
						tips: 1
					});
        			return false;
        		}

        		this.filterHandle();
        	},
        	updateData(callback){
        		callback && callback(this);
        	},
        	reset(){
        		this.riskPreferLabel.default = [];
        		this.fluidityPreferLabel.default = [];
        		this.codeVal = '';
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
				    data: new FormData(document.getElementById('fundgroupsTagsUploadID')),
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
				    error: (res) => {
				    	layer.close(l);
						if(res.responseJSON && res.responseJSON.message){
							layer.msg(res.responseJSON.message);
						}else{
							layer.msg('出现异常');
						}
				    }
				});
        	}
        }
    }
</script>