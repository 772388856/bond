/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

// let baseUrl = 'http://localhost:3000';
let baseUrl = typeof window.baseUrl == 'undefined' ? 'http://118.25.48.96:8080' : window.baseUrl;
let routerMode = 'history';

if (process.env.NODE_ENV == 'development') {

}else if(process.env.NODE_ENV == 'production'){
	// baseUrl = '';
}

export {
	baseUrl,
	routerMode
}
