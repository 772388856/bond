import fetch from '../config/fetch'
import { baseUrl } from '../config/env'

// 登录
export const login = data => fetch('/web/login', data, 'POST');

// 权限查询
export const permission = userId => fetch(`/web/user/${userId}/permission`);

// 获取用户信息
export const getAdminInfo = () => fetch('/web/user/info');



// 优选基金（初始化）
export const preferfundCondition = () => fetch('/web/preferfund/condition');

// 优选基金 （ 获取用户上次选择（输入）的条件 ）
export const preferfundSelect = () => fetch('/web/preferfund/condition/select');

// 优选基金 （查询接口）
export const preferfunds = data => fetch('/web/preferfunds', data);

// 优选基金 （删除基金）
export const deletePreferfunds = code => fetch(`/web/preferfund/${code}`);



// 基金组合管理 （初始化）
export const fundgroupCondition = code => fetch('/web/fundgroup/condition');

// 基金组合管理 （查询接口）
export const fundgroups = data => fetch('/web/fundgroups', data);

// 基金组合管理 （上传）
export const fundgroupsUpload = `${baseUrl}/web/fundgroup/upload`;



// 基金组合标签管理 （上传）
export const fundgroupsTagsUpload = `${baseUrl}/web/fundgroup/tags/upload`;



