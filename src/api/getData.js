import fetch from '../config/fetch'

// 登录
export const login = data => fetch('/web/login', data, 'POST');

// 权限查询
export const permission = userId => fetch(`/web/user/${userId}/permission`);

