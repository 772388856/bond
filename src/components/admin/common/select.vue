<template>
	<div class="admin-select">
		<span class="text">
			{{ text }}
			<i class="select-icon admin-icon"></i>
		</span>
		<ul class="options" v-if="options.length">
			<li v-for="list in options">{{ list }}</li>
		</ul>
	</div>
</template>

<script>
    export default {
        props: ['lists'],
        data(){
        	return {
        		text: '',
        		options: []
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

		.text {
			display: inline-block;
			position: relative;
			padding-left: 15px;
			padding-right: 45px;
			background: #db5565;
			border-radius: 5px;
			box-shadow: 0 2px 0 #af4451;
			transition: .3s;
			&:hover {
				opacity: .8;
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
		}
	}
</style>