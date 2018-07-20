/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

// let baseUrl = 'http://localhost:3000';
let baseUrl = 'http://10.2.1.73:8080';
let routerMode = 'history';

if (process.env.NODE_ENV == 'development') {

}else if(process.env.NODE_ENV == 'production'){
	// baseUrl = '';
}

export {
	baseUrl,
	routerMode
}
