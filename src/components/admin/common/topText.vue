<template>
	<div class="admin-top-text">
		<slot></slot>
	</div>
</template>

<style lang="scss">
	.admin-top-text {
		font-size: 22px;
		background: #dfe0e6;
		padding: 10px 14px;
		margin-bottom: 15px;

		span {
			color: #db5565;
			&:after {
				content: ",";
			}
			&:last-child:after {
				content: "";
			}
		}
	}
</style>