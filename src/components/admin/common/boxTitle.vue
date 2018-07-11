<template>
	<div class="admin-box-title">
		<div class="title">{{ title }}</div>
		<slot></slot>
	</div>
</template>

<script>
    export default {
        props: ['title']
    }
</script>

<style lang="scss">
	.admin-box-title {
		font-size: 22px;
		padding: 10px 24px;
		line-height: 32px;
		.title {
			font-weight: bold;
			border-left: 4px solid #2095f2;
			padding-left: 10px;
		}
	}
</style>