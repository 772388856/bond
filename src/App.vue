<template>
    <router-view></router-view>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style lang="scss">
    @import './assets/css/common/common';

    /* 重写插件样式 */
    .layui-layer-molv {
    	background-color: #fbf8f1 !important;
    }
    .layui-layer-molv .layui-layer-btn a {
		background: #e15868 !important;
		box-shadow: 0 2px 0 #af4451 !important;
		border-color: #e15868 !important;
		border-radius: 5px !important;
	}
	.layui-layer-setwin .layui-layer-close2:hover {
		background-position: -149px -31px !important;
		opacity: 1 !important;
	}
	.layui-layer-molv .layui-layer-btn .layui-layer-btn1 {
		background: #e15868 !important;
		box-shadow: 0 2px 0 #af4451 !important;
		color: #FFF !important;
	}
	.layui-layer-dialog .layui-layer-content {
		font-size: 16px !important;

	}
</style>
