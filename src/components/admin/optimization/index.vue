<template>
	<div v-if="!load">
		<top-title>优选基金池特点</top-title>

		<top-text v-if="original.scala.length || original.value.length || original.topic.length">
			本次优选级基金池的参数为：
			<template v-if="original.scala.length">
			规模风格：<span>
				<template v-for="(t, index) in original.scala">
					<template v-if="index">、</template>"
					{{ t }}"
				</template>
			</span>
			</template>
			<template v-if="original.value.length">
			价格风格：<span>
				<template v-for="(t, index) in original.value">
					<template v-if="index">、</template>"
					{{ t }}"
				</template>
			</span>
			</template>
			<template v-if="original.topic.length">
			热门主题：<span>
				<template v-for="(t, index) in original.topic">
					<template v-if="index">、</template>"
					{{ t }}"
				</template>
			</span>
			</template>
		</top-text>

		<div class="admin-box" v-if="view">
			<box-title title="优选基金设置"></box-title>
			<div class="condition-item">
				<my-select text="规模风格" keyVal="scala" :lists="scala" @updateData="updateData" :checkbox="true"></my-select>
				<my-select text="价值风格" keyVal="value" :lists="value" @updateData="updateData" :checkbox="true"></my-select>
				<my-select text="热门主题" keyVal="topic" :lists="topic" @updateData="updateData" :checkbox="true"></my-select>
				<a href="javascript:;" class="condition-search" @click="filterHandle">
					<i class="admin-icon"></i>
				</a>
				<a href="javascript:;" class="condition-reset" @click="setPreferfund">设置</a>
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
				:title="['序号', '基金代码', '基金名称', '二级基金类型名称', '资金规模', '价值取向', '热门主题', '评级', '近一年收益率']" 
				:lists="preferfunds | dataSort" :showDel="true"
				:countNum="countNum"
				:page="page"
				@updateData="updateData"
				:modify="modify"
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
	import {preferfundCondition, preferfundSelect, preferfunds, deletePreferfunds, preferfundConditionSet} from '../../../api/getData';
	import {stateHandle} from '../../../config/tool';

    export default {
        name: 'optimization',
        components: { topTitle, topText, boxTitle, mySelect, myTable },
        data(){
        	return {
        		load: true,
        		codeVal: '',
        		scala: {
        			default: [],
        			list: []
        		},
        		value: {
        			default: [],
        			list: []
        		},
        		topic: {
        			default: [],
        			list: []
        		},
        		original: {
        			scala: [],
        			value: [],
        			topic: []
        		},
        		preferfunds: [],
        		pageSize: 10,
        		page: 1,
        		countNum: 0,
        		count: 0,
        		modify: false,
        		view: false
        	}
        },
        filters: {
        	dataSort(lists){
        		if(!lists.length) return lists;

        		const newData = [];
        		lists.forEach((list, index) => {
        			newData.push({
        				rank: list.rank,
        				code: list.code,
        				name: list.name,
        				fundType: list.fundType,
        				scala: list.scala,
        				value: list.value,
        				topic: list.topic,
        				rate: list.rate,
        				yieldRate: list.yieldRate
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
        		this.originalData();
        		this.filterHandle(() => {
    				layer.close(layerLoad);
        			this.load = false;
    			});
        	});
		},
		mounted(){
			this.adminInfo.permissions.forEach((list, index) => {
				if(list.permissionId == '1'){
					if(list.modify) this.modify = true;
					if(list.view) this.view = true;
				}
			});
		},
		methods: {
			// 初始化数据
			async getData(callback){
				const res = await preferfundCondition();

				stateHandle({
					data: res,
					codeSuccess: () => {
						this.scala.list = res.data.scala;
						this.value.list = res.data.value;
						this.topic.list = res.data.topic;
					}
				});

				callback && callback();
			},
			// 获取用户上次选择（输入）的条件
			async originalData(callback){
				const res = await preferfundSelect();

				stateHandle({
					data: res,
					codeSuccess: () => {
						const d = res.data;

						if(d.scala){
							this.original.scala = d.scala;
						}
						if(d.value){
							this.original.value = d.value;
						}
						if(d.topic){
							this.original.topic = d.topic;
						}
					}
				});

				callback && callback();
			},
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

				if(this.scala.default.length){
					let scalaArr = [];

					this.scala.default.forEach((list, index) => {
						scalaArr.push(list.id);
					});
					str.scala = scalaArr;
				}
				if(this.value.default.length){
					let valueArr = [];

					this.value.default.forEach((list, index) => {
						valueArr.push(list.id);
					});
					str.value = valueArr;
				}
				if(this.topic.default.length){
					let topicArr = [];

					this.topic.default.forEach((list, index) => {
						topicArr.push(list.id);
					});
					str.topic = topicArr;
				}
				if(this.codeVal){
					str.code = this.codeVal;
				}

				const res = await preferfunds(str);

				stateHandle({
					data: res,
					codeSuccess: () => {
						this.preferfunds = res.data;
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
        	async removeData(val){
        		layer.closeAll();

        		layer.msg('删除中', {
					icon: 16,
					shade: 0.5,
					time: 0
				});

        		const res = await deletePreferfunds(val.code);

				stateHandle({
					data: res,
					codeSuccess: () => {
						this.filterHandle(() => {
							layer.closeAll();
							layer.msg('删除成功');
						}, {tips: false});
					}
				});
        	},
        	reset(){
        		this.scala.default = [];
        		this.value.default = [];
        		this.topic.default = [];
        		this.codeVal = '';
        	},
        	// 设置
        	async setPreferfund(){
        		const str = {}, nameStr = {};

        		if(this.scala.default.length){
					let scalaArr = [], Name = [];

					this.scala.default.forEach((list, index) => {
						scalaArr.push(list.id);
						Name.push(list.name);
					});
					str.scala = scalaArr;
					nameStr.scala = Name;
				}
				if(this.value.default.length){
					let valueArr = [], Name = [];

					this.value.default.forEach((list, index) => {
						valueArr.push(list.id);
						Name.push(list.name);
					});
					str.value = valueArr;
					nameStr.value = Name;
				}
				if(this.topic.default.length){
					let topicArr = [], Name = [];

					this.topic.default.forEach((list, index) => {
						topicArr.push(list.id);
						Name.push(list.name);
					});
					str.topic = topicArr;
					nameStr.topic = Name;
				}

				if(nameStr.scala){
					this.original.scala = nameStr.scala;
				}else{
					this.original.scala = [];
				}
				if(nameStr.value){
					this.original.value = nameStr.value;
				}else{
					this.original.value = [];
				}
				if(nameStr.topic){
					this.original.topic = nameStr.topic;
				}else{
					this.original.topic = [];
				}

        		const res = await preferfundConditionSet(str);

        		layer.msg('设置中', {
					icon: 16,
					shade: 0.5,
					time: 0
				});

				stateHandle({
					data: res,
					codeSuccess: () => {
						layer.closeAll();
						layer.msg('设置成功');
					}
				});
        	}
		}
    }
</script>