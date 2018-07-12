<template>
	<div class="admin-select" @mouseenter="mouseenterSelect" @mouseleave="mouseleaveSelect">
		<span class="text">
			{{ text }}
			<i class="select-icon admin-icon"></i>
		</span>
		<ul class="options" v-if="options.length" ref="options" :class="{on: optionsActive}">
			<li v-for="list in options" @click="select(list)">{{ list }}</li>
		</ul>
	</div>
</template>

<script>
    export default {
        props: ['lists'],
        data(){
        	return {
        		text: '',
        		options: [],
        		optionsActive: false
        	}
        },
        mounted(){
        	this.lists.forEach((list, index) => {
        		if(!index){
        			this.text = list;
        		}else{
        			this.options.push(list);
        		}
        	});
        },
        methods: {
        	select(text){
        		this.text = text;
        		this.mouseleaveSelect();
        	},
        	mouseenterSelect(){
        		this.$refs.options.style.display = 'block';
        		setTimeout(() => {
        			this.optionsActive = true;
        		}, 50);
        	},
        	mouseleaveSelect(){
        		this.optionsActive = false;
        		setTimeout(() => {
        			this.$refs.options.style.display = 'none';
        		}, 50);
        	}
        }
    }
</script>

<style lang="scss">
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