<template>
	<div v-if="!load" class="tips_inner">
		<top-title>基金提示管理</top-title>

		<div class="admin-box">
			<box-title :title="`共找到${count}个符合条件的结果`"></box-title>
			<div class="list-tab clearfix" v-if="view">
				<div class="left fl">
					<div class="text fl">基金代码搜索</div>
					<div class="s-box fl">
						<input type="text" v-model="codeVal" class="s-input" placeholder="请输入基金代码" />
						<a href="javascript:;" class="s-icon admin-icon" @click="filterHandle"></a>
					</div>
				</div>
			</div>
			<my-table 
				:title="['基金代码', '基金名称', '提示种类id', '提示种类名称', '提示内容', '提示日期']" 
				:lists="prompt | dataSort"
				:countNum="countNum"
				:page="page"
				@updateData="updateData"
				:modify="modify"
				modifyText="警告操作"
				type="tips"
				:radioAll="radioAll"
			></my-table>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapState} from 'vuex';
	import topTitle from '../common/topTitle';
	import boxTitle from '../common/boxTitle'
	import myTable from '../common/table'
	import {fundPrompt, fundPromptState} from '../../../api/getData';
	import {stateHandle} from '../../../config/tool';

    export default {
        name: 'tips',
        components: { topTitle, myTable, boxTitle },
        data(){
        	return {
        		load: true,
        		codeVal: '',
        		prompt: [],
        		pageSize: 10,
        		page: 1,
        		countNum: 0,
        		count: 0,
        		modify: false,
        		view: false,
        		radioAll: false
        	}
        },
        filters: {
        	dataSort(lists){
        		if(!lists.length) return lists;

        		const newData = [];
        		lists.forEach((list, index) => {
        			newData.push({
        				fundCode: list.fundCode,
        				fundName: list.fundName,
        				typeId: list.typeId,
        				typeName: list.typeName,
        				content: list.content,
        				date: list.date,
        				operationVal: list.status
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

        	this.filterHandle(() => {
				layer.close(layerLoad);
    			this.load = false;
			});
		},
		mounted(){
			this.adminInfo.permissions.forEach((list, index) => {
				if(list.permissionId == '6' && list.modify){
					if(list.modify) this.modify = true;
					if(list.view) this.view = true;
				}
			});
		},
		methods: {
			// 查询
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

				if(this.codeVal){
					str.fundCode = this.codeVal;
				}

				const res = await fundPrompt(str);

				stateHandle({
					data: res,
					codeSuccess: () => {
						this.prompt = res.data;
						this.countNum = Math.ceil(res.count / this.pageSize);
						this.count = res.count;
						config.tips !== false && layer.close(l);
						this.checkRadioAll();
					}
				});

				typeof callback == 'function' && callback();
        	},
        	updateData(callback){
        		callback && callback(this);
        	},
        	async radioFn(obj, inx){
        		let l, str = {}, idArr = [];

        		l = layer.msg('操作中', {
					icon: 16,
					shade: 0.5,
					time: 0
				});

				idArr.push(this.prompt[inx].id);

				str.status = obj.operationVal == '1' ? '0' : '1';
				str.id = idArr;

				const res = await fundPromptState(str);

				stateHandle({
					data: res,
					codeSuccess: () => {
						layer.close(l);
						this.$set(this.prompt[inx], 'status', str.status);

						this.checkRadioAll();
					}
				});
        	},
        	checkRadioAll(){
        		let on = [], off = [];
				this.prompt.forEach((list, index) => {
					if(list.status == '1'){
						on.push(list.id)
					}else{
						off.push(list.id)
					}
				});

				if(on.length == this.prompt.length){
					this.radioAll = true;
				}else{
					this.radioAll = false;
				}
        	},
        	async radioAllFn(){
        		let l, str = {}, idArr = [];

        		l = layer.msg('操作中', {
					icon: 16,
					shade: 0.5,
					time: 0
				});

				this.prompt.forEach((list, index) => {
					idArr.push(list.id);
				});

				str.status = this.radioAll ? '0' : '1';
				str.id = idArr;

				const res = await fundPromptState(str);

				stateHandle({
					data: res,
					codeSuccess: () => {
						layer.close(l);
						this.prompt.forEach((list, index) => {
							this.$set(this.prompt[index], 'status', str.status);
						});
						this.radioAll = !this.radioAll;
					}
				});
        	}
		}
    }
</script>
