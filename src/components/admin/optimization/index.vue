<template>
	<div v-if="!load">
		<top-title>优选基金池特点</top-title>

		<top-text v-if="scala.default.name || value.default.name || topic.default.length">
			本次优选级基金池的参数为：
			<template v-if="scala.default.name">
			规模风格：<span>"{{ scala.default.name }}"</span>{{ (value.default.name || topic.default.length) ? '，' : ''}}
			</template>
			<template v-if="value.default.name">
			价格风格：<span>"{{ value.default.name }}"</span>{{ topic.default.length ? '，' : ''}}
			</template>
			<template v-if="topic.default.length">
			热门主题：<span>
				<template v-for="(t, index) in topic.default">
					<template v-if="index">、</template>"
					{{ t.name }}"
				</template>
			</span>
			</template>
		</top-text>

		<div class="admin-box">
			<box-title title="优选基金搜索"></box-title>
			<div class="condition-item">
				<my-select text="规模风格" keyVal="scala" :lists="scala" @updateData="updateData"></my-select>
				<my-select text="价值风格" keyVal="value" :lists="value" @updateData="updateData"></my-select>
				<my-select text="热门主题" keyVal="topic" :lists="topic" @updateData="updateData" :checkbox="true"></my-select>
				<a href="javascript:;" class="condition-search" @click="filterHandle">
					<i class="admin-icon"></i>
				</a>
				<a href="javascript:;" class="condition-reset" @click="reset">重置所有条件</a>
			</div>
		</div>

		<div class="admin-box">
			<box-title :title="`共找到${count}个符合条件的结果`"></box-title>
			<div class="list-tab clearfix">
				<div class="left fl">
					<div class="text fl">基金代码搜索</div>
					<div class="s-box fl">
						<input type="text" v-model="codeVal" class="s-input" placeholder="请输入基金代码" />
						<a href="javascript:;" class="s-icon admin-icon" @click="searchCode"></a>
					</div>
				</div>
			</div>
			<my-table 
				:title="['基金代码', '基金名称', '基金类型', '基金特征']" 
				:lists="preferfunds" :showDel="true"
				:countNum="countNum"
				:page="page"
				@updateData="updateData"
			></my-table>
		</div>
	</div>
</template>

<script>
	import topTitle from '../common/topTitle'
	import topText from '../common/topText'
	import boxTitle from '../common/boxTitle'
	import mySelect from '../common/select'
	import myTable from '../common/table'
	import {preferfundCondition, preferfundSelect, preferfunds, deletePreferfunds} from '../../../api/getData';
	import {stateHandle} from '../../../config/tool';

    export default {
        name: 'optimization',
        components: { topTitle, topText, boxTitle, mySelect, myTable },
        data(){
        	return {
        		load: true,
        		codeVal: '',
        		scala: {
        			default: {},
        			list: []
        		},
        		value: {
        			default: {},
        			list: []
        		},
        		topic: {
        			default: [],
        			list: []
        		},
        		preferfunds: [],
        		pageSize: 10,
        		page: 1,
        		countNum: 0,
        		count: 0
        	}
        },
        created(){
        	const layerLoad = layer.msg('加载数据中...', {
				icon: 16,
				shade: 0,
				time: 0
			});

        	this.getData(() => {
        		this.originalData(() => {
        			this.filterHandle(() => {
        				layer.close(layerLoad);
	        			this.load = false;
        			});
        		});
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
							this.scala.default = d.scala;
						}
						if(d.value){
							this.value.default = d.value;
						}
						if(d.topic){
							this.topic.default = d.topic;
						}
					}
				});

				callback && callback();
			},
			// 查询
			async filterHandle(callback, config={}){
				let l;

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

				if(this.scala.default.id){
					str.scala = this.scala.default.id;
				}
				if(this.value.default.id){
					str.value = this.value.default.id;
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
        		const res = await deletePreferfunds(val.code);

				stateHandle({
					data: res,
					codeSuccess: () => {
						this.filterHandle(() => {
							layer.closeAll();
							layer.msg(res.msg);
						}, {tips: false});
					}
				});
        	},
        	reset(){
        		this.scala.default = {};
        		this.value.default = {};
        		this.topic.default = [];
        		this.codeVal = '';
        	}
		}
    }
</script>