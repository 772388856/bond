const stateHandle = (config = {}) => {
	if(config.data.statusError && config.data.status != 200){
		if(config.statusError){
			config.statusError();
		}else{
			layer.msg('出现异常, 请刷新');
		}
		return false;
	}

	if(config.data.responseCode == '20000'){
		config.codeSuccess && config.codeSuccess();
	}else if(config.data.responseCode == '-1'){
		if(config.codeLogin){
			config.codeLogin();
		}else{
			this.$router.push('/login');
		}
	}else{
		if(config.codeOther){
			config.codeOther();
		}else{
			layer.msg(config.data.msg);
		}
	}
}

export {
	stateHandle
}