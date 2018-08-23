import fetch from '../config/fetch'
import { baseUrl } from '../config/env'

// 登录
export const login = data => fetch('/web/login', data, 'POST');

// 权限查询
export const permission = userId => fetch(`/web/user/${userId}/permission`);

// 获取用户信息
export const getAdminInfo = () => fetch('/web/user/info');

// 站内信
export const fundgroupAlert = data => fetch('/web/fundgroup/alert', data);



// 优选基金（初始化）
export const preferfundCondition = () => fetch('/web/preferfund/condition');

// 优选基金（设置）
export const preferfundConditionSet = data => fetch('/web/preferfund/condition', data, 'POST');

// 优选基金 （ 获取用户上次选择（输入）的条件 ）
export const preferfundSelect = () => fetch('/web/preferfund/condition/select');

// 优选基金 （查询接口）
export const preferfunds = data => fetch('/web/preferfunds', data);

// 优选基金 （删除基金）
export const deletePreferfunds = code => fetch(`/web/preferfund/${code}`, {}, 'DELETE');



// 基金组合管理 （初始化）
export const fundgroupCondition = code => fetch('/web/fundgroup/condition');

// 基金组合管理 （查询接口）
export const fundgroups = data => fetch('/web/fundgroups', data);

// 基金组合管理 （上传）
export const fundgroupsUpload = `${baseUrl}/web/fundgroup/upload`;

// 基金组合管理 （下载）
export const fundgroupsDownload = `${baseUrl}/web/fundgroup/download`;

// 基金组合管理 （组合详情查询）
export const fundgroupsQuery = code => fetch(`/web/fundgroup/${code}`);



// 基金组合标签管理 （上传）
export const fundgroupsTagsUpload = `${baseUrl}/web/fundgroup/tags/upload`;

// 基金组合标签管理 （下载）
export const fundgroupsTagsDownload = `${baseUrl}/web/fundgroup/tags/download`;

// 基金组合标签管理 （查询）
export const fundgroupTags = data => fetch('/web/fundgroup/tags', data);



// 黑名单管理（查询接口）
export const blacklists = data => fetch('/web/blacklists', data);

// 黑名单管理（下拉框）
export const blacklistCondition = () => fetch('/web/blacklist/condition');

// 黑名单管理（上传）
export const blacklistUpload = `${baseUrl}/web/blacklist/upload`;

// 黑名单管理（下载）
export const blacklistDownload = `${baseUrl}/web/blacklist/download`;

// 黑名单管理（删除）
export const deleteBlacklist = code => fetch(`/web/blacklist/${code}`, {}, 'DELETE');

// 黑名单管理（数量）
export const blacklistCount = () => fetch('/web/blacklist/count');



// 基金组合提示管理（查询）
export const fundgroupPrompt = data => fetch('/web/fundgroup/prompt', data);

// 基金组合提示管理（状态设置）
export const fundgroupPromptState = data => fetch('/web/fundgroup/prompt', data, 'PUT');



// 基金提示管理（查询）
export const fundPrompt = data => fetch('/web/fund/prompt', data);

// 基金提示管理（状态设置）
export const fundPromptState = data => fetch('/web/fund/prompt', data, 'PUT');


