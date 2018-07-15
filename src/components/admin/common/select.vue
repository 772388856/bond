<template>
	<div class="admin-select" @mouseenter="mouseenterSelect" @mouseleave="mouseleaveSelect" @click="checkboxHandle">
		<!-- 多选 -->
		<span v-if="checkbox" class="text checkbox">
			<template v-if="lists.default.length == 1">
				{{ lists.default[0].name }}
			</template>
			<template v-else-if="lists.default.length > 1">
				{{ lists.default[0].name }} ...
			</template>
			<template v-else>
				{{ text }}
			</template>
			<i class="select-icon admin-icon"></i>
		</span>
		<!-- 单选 -->
		<span v-else class="text">
			<template v-if="lists.default.name">
				{{ lists.default.name }}
			</template>
			<template v-else>
				{{ text }}
			</template>
			<i class="select-icon admin-icon"></i>
		</span>
		<ul class="options" v-if="lists.list.length" ref="options" :class="{on: optionsActive}">
			<li v-for="list in lists.list" @click="select(list)">{{ list.name }}</li>
		</ul>
	</div>
</template>

<script>	
    export default {
        props: ['lists', 'keyVal', 'checkbox', 'text'],
        data(){
        	return {
        		optionsActive: false,
        		selectCheckbox: false
        	}
        },
        mounted(){

        },
        methods: {
        	select(list){
        		this.mouseleaveSelect();
        		this.$emit('updateData', (obj) => {
        			obj[this.keyVal].default = list;
        		})
        	},
        	mouseenterSelect(){
        		if(this.checkbox) return false;

        		this.$refs.options.style.display = 'block';
        		setTimeout(() => {
        			this.optionsActive = true;
        		}, 50);
        	},
        	mouseleaveSelect(){
        		if(this.checkbox) return false;

        		this.optionsActive = false;
        		setTimeout(() => {
        			this.$refs.options.style.display = 'none';
        		}, 50);
        	},
        	saveData(id, name, type){
        		if(type == 'add'){
        			this.$emit('updateData', (obj) => {
	        			obj[this.keyVal].default.push({
    						id: id,
    						name: name
    					})
	        		})
        		}else if(type == 'remove'){
        			this.$emit('updateData', (obj) => {
        				obj[this.keyVal].default.forEach((list, index) => {
	        				if(list.id == id){
	        					obj[this.keyVal].default.splice(index, 1);
	        				}
	        			});
        			})
        		}
        	},
        	checkboxHandle(){
        		if(!this.checkbox) return false;

        		let oLi = '';
        		this.lists.list.forEach((list, index) => {
        			let type = '';

        			this.lists.default.forEach((list2, index2) => {
        				if(list.id == list2.id){
        					type = 'active';
        				}
        			});

        			oLi += `<li class="${type} ${this.keyVal}_checkbox_list" id="${list.id}" name="${list.name}">
        				<i class="checkbox-icon admin-icon"></i>
        				<span>${list.name}</span>
    				</li>`
        		})

        		layer.open({
					type: 1,
					shade: false,
					title: false,
					btn: '确定',
					shade: 0.3,
					skin: 'layui-layer-molv',
					content: `
						<ul class="checkbox-pop">
							${oLi}
						</ul>
					`
				}, () => {
					alert(1)
				});

				if(!this.selectCheckbox){
					this.selectCheckbox = true;
					let _this = this;

					$(document).on('click', `.${this.keyVal}_checkbox_list`, function(){
						if($(this).hasClass('active')){
							$(this).removeClass('active');
							_this.saveData($(this).attr('id'), $(this).attr('name'), 'remove');
						}else{
							$(this).addClass('active');
							_this.saveData($(this).attr('id'), $(this).attr('name'), 'add');
						}
					});
				}
        	}
        }
    }
</script>

<style lang="scss">
	.checkbox-pop {
		max-width: 700px;
		padding: 20px;
		padding-bottom: 10px;
		color: #919599;
		font-size: 16px;
		li {
			display: inline-block;
			margin-right: 15px;
			margin-bottom: 10px;
			cursor: pointer;
			&.active,
			&:hover {
				color: #e15868;
				i {
					background-position: -49px -169px;
				}
			}
		}
		i, span {
			display: inline-block;
			vertical-align: middle;
		}
		i {
			width: 24px;
			height: 22px;
			background-position: -89px -169px;
		}
	}
	.admin-select {
		display: inline-block;
		cursor: pointer;
		position: relative;
		height: 46px;
		line-height: 46px;
		font-size: 18px;
		color: #FFF;

		&:hover {
			.text {
				background: #c04b59;
				border-radius: 5px 5px 0 0;

				&.checkbox {
					border-radius: 5px;
				}
			}
			.select-icon {
				transform: rotate(180deg);
			}
		}
		.text {
			display: inline-block;
			position: relative;
			padding-left: 15px;
			padding-right: 45px;
			background: #db5565;
			border-radius: 5px;
			box-shadow: 0 2px 0 #af4451;
			transition: .3s;
			&.checkbox .select-icon {
				transform: rotate(270deg);
			}
		}
		.select-icon {
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			width: 40px;
			height: 40px;
			background-position: -160px 0;
			transition: .3s;
		}
		.options {
			display: none;
			position: absolute;
			left: 0;
			top: 99%;
			z-index: 10;
			width: 100%;
			background: #c04b59;
			color: #FFF;
			border-radius: 0 0 5px 5px;
			font-size: 14px;
			text-align: center;
			transition: .3s;
			transform: translate3d(0,50px,0);
			opacity: 0;

			li {
				transition: .3s;
				cursor: pointer;
				&:hover {
					background: #cd6f7a;
				}
			}
		}
		.on {
			transform: translate3d(0,0,0);
			opacity: 1;
		}
	}
</style>