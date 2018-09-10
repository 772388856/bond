<template>
	<div v-if="!load">
		<top-title>黑名单管理</top-title>

		<div class="top-label clearfix">
			<a href="javascript:;" class="item-1 item fl" v-if="modify">
				<form id="blacklistUploadID" enctype='multipart/form-data'>
					<div>黑名单基金上传</div>
					<div class="icon-box">
						<i class="icon-1 icon admin-icon"></i>
					</div>
					<input class="file" name="file" type="file" @change="upload" />
				</form>
			</a>
			<a :href="blacklistDownload" class="item-3 item fl" v-if="view">
				<div>黑名单基金下载</div>
				<div class="icon-box">
					<i class="icon-3 icon admin-icon"></i>
				</div>
			</a>
		</div>

		<div class="admin-box" v-if="view">
			<box-title title="筛选搜索"></box-title>
			<div class="condition-item">
				<my-select text="二级基金分类" keyVal="fundType" :lists="fundType" @updateData="updateData" :checkbox="true" type="code" :allSelect="true"></my-select>
				<my-select text="基金公司信息" keyVal="company" :lists="company" @updateData="updateData" :checkbox="true" type="code" :allSelect="true"></my-select>
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
				:title="['基金代码', '基金名称', '二级基金类型名称', '基金公司名称']" 
				:lists="blacklistsData | dataSort"
				:countNum="countNum"
				:page="page"
				@updateData="updateData"
				:modify="modify"
				:showDel="true"
			></my-table>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapState} from 'vuex';
	import topTitle from '../common/topTitle';
	import {stateHandle} from '../../../config/tool';
	import mySelect from '../common/select';
	import myTable from '../common/table';
	import boxTitle from '../common/boxTitle';
	import {blacklists, blacklistCondition, blacklistUpload, blacklistDownload, deleteBlacklist, blacklistCount} from '../../../api/getData';

    export default {
        name: 'blacklist',
        components: { topTitle, mySelect, myTable, boxTitle },
        data(){
        	return {
        		codeVal: '',
        		load: true,
        		fundType: {
        			default: [],
        			list: []
        		},
        		company: {
        			default: [],
        			list: []
        		},
        		pageSize: 10,
        		page: 1,
        		countNum: 0,
        		blacklistsData: [],
        		modify: false,
        		view: false,
        		blacklistDownload: blacklistDownload,
        		count: 0
        	}
        },
        computed: {
			...mapState(['adminInfo']),
		},
		filters: {
        	dataSort(lists){
        		if(!lists.length) return lists;

        		const newData = [];
        		lists.forEach((list, index) => {
        			newData.push({
        				code: list.code,
        				name: list.name,
        				fundTypeName: list.fundTypeName,
        				companyName: list.companyName
        			})
        		});

        		return newData;
        	}
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

        	this.getBlacklistCount();
		},
		mounted(){
			this.adminInfo.permissions.forEach((list, index) => {
				if(list.permissionId == '4'){
					if(list.modify) this.modify = true;
					if(list.view) this.view = true;
				}
			});
		},
		methods: {
			...mapActions(['setAdminData']),
			updateData(callback){
        		callback && callback(this);
        	},
        	// 初始化数据
			async getData(callback){
				const res = await blacklistCondition();

				stateHandle({
					data: res,
					codeSuccess: () => {
						this.fundType.list = res.data.fundType;
						this.company.list = res.data.company;
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

				if(this.fundType.default.length){
					let arr = [];

					this.fundType.default.forEach((list, index) => {
						arr.push(list.id);
					});
					str.fundTypeCode = arr;
				}
				if(this.company.default.length){
					let arr = [];

					this.company.default.forEach((list, index) => {
						arr.push(list.id);
					});
					str.companyCode = arr;
				}
				if(this.codeVal){
					str.code = this.codeVal;
				}

				const res = await blacklists(str);

				stateHandle({
					data: res,
					codeSuccess: () => {
						this.blacklistsData = res.data.detail;
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
        	reset(){
        		this.fundType.default = [];
        		this.company.default = [];
        		this.codeVal = '';
        	},
        	upload(){
        		const l = layer.msg('文件正在上传中，请稍候', {
					icon: 16,
					shade: 0.5,
					time: 0
				});

				$.ajax({
				    url: blacklistUpload,
				    type: 'POST',
				    cache: false,	
				    data: new FormData(document.getElementById('blacklistUploadID')),
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
        	},
        	async removeData(val){
        		layer.closeAll();

        		layer.msg('删除中', {
					icon: 16,
					shade: 0.5,
					time: 0
				});

        		const res = await deleteBlacklist(val.code);

				stateHandle({
					data: res,
					codeSuccess: () => {
						this.filterHandle(() => {
							layer.closeAll();
							layer.msg('删除成功');

							// 更新数量
							this.getBlacklistCount();
						}, {tips: false});
					}
				});
        	},
        	async getBlacklistCount(){
        		const res = await blacklistCount();

        		stateHandle({
					data: res,
					codeSuccess: () => {
						res.data && res.data.count && this.setAdminData({
							blacklistCount: res.data.count
						});
					},
					codeOther: () => {

					}
				});
        	}
		}
    }
</script>