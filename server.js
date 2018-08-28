var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./'));
// app.use(express.static('./dist/'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(session({ 
    secret: 'secret',
    cookie:{ 
        maxAge: 1000*60*30
    }
}));
// app.use('/login', express.static('./dist/index.html'));
// app.use('/admin/*', express.static('./dist/index.html'));

// 登录
app.post('/web/login', (req, res) => {
	const userName = req.body.userName;
	const password = req.body.password;

	if(userName == 'admin' && password == 'admin'){
	    req.session.user = 'admin';
		res.json({
	        responseCode: 20000,
	        msg: 'success',
	        data: {
	        	userId: '1',
	        	userName: 'admin'
	        }
	    })
	}else{
		res.json({
	        responseCode: 20001,
	        msg: '用户名或者密码错误',
	        data: {}
	    })
	}
})

// 权限查询
app.get('/web/user/*/permission', (req, res) => {
	res.json({
	   "responseCode":20000,
	   "msg":"success",
	   "data":{
	       "permissions":[
			    {
			        "permissionId": 1,
			        "modify": true,
			        "view": true,
			        "permissionName": "优选基金管理"
			    },
			    {
			        "permissionId": 2,
			        "modify": true,
			        "view": true,
			        "permissionName": "基金组合管理"
			    },
			    {
			        "permissionId": 3,
			        "modify": true,
			        "view": true,
			        "permissionName": "基金组合标签管理"
			    },
			    {
			        "permissionId": 4,
			        "modify": true,
			        "view": true,
			        "permissionName": "黑名单管理"
			    },
			    {
			        "permissionId": 5,
			        "modify": true,
			        "view": true,
			        "permissionName": "基金组合提示管理"
			    },
			    {
			        "permissionId": 6,
			        "modify": true,
			        "view": true,
			        "permissionName": "基金提示管理"
			    }
			]
	   }
	})
})

// 获取用户信息
app.get('/web/user/info', (req, res) => {
	if(req.session.user == 'admin'){
		res.json({
	        responseCode: 20000,
	        msg: "success",
	        data: {
	        	userId: '1',
		        userName: 'admin'
	        }
	    })
    }else{
    	res.json({
	        responseCode: 20001,
	        msg: "",
	        data: {}
	    })
    }
})

// 优选基金（初始化）
app.get('/web/preferfund/condition', (req, res) => {
	res.json({
        responseCode: 20000,
        msg: "success",
        data: {
		    "scala": [
		        {
		            "name": "小盘",
		            "id": 1342013
		        },
		        {
		            "name": "中盘",
		            "id": 1342012
		        },
		        {
		            "name": "大盘",
		            "id": 1342011
		        },
		        {
		            "name": "综合",
		            "id": 1342010
		        }
		    ],
		    "topic": [
		        {
		            "name": "大健康",
		            "id": 131010
		        },
		        {
		            "name": "改革",
		            "id": 131011
		        },
		        {
		            "name": "国防安全",
		            "id": 131012
		        },
		        {
		            "name": "新能源",
		            "id": 131013
		        },
		        {
		            "name": "一带一路",
		            "id": 131014
		        },
		        {
		            "name": "互联网金融",
		            "id": 131015
		        },
		        {
		            "name": "制造",
		            "id": 131016
		        },
		        {
		            "name": "能源资源",
		            "id": 131017
		        },
		        {
		            "name": "贵金属",
		            "id": 131018
		        },
		        {
		            "name": "生物医疗",
		            "id": 131019
		        },
		        {
		            "name": "信息技术",
		            "id": 131020
		        },
		        {
		            "name": "食品饮料",
		            "id": 131021
		        },
		        {
		            "name": "消费",
		            "id": 131022
		        },
		        {
		            "name": "文化休闲",
		            "id": 131023
		        },
		        {
		            "name": "金融地产",
		            "id": 131024
		        },
		        {
		            "name": "运输",
		            "id": 131025
		        },
		        {
		            "name": "环保",
		            "id": 131026
		        },
		        {
		            "name": "农业",
		            "id": 131027
		        }
		    ],
		    "value": [
		        {
		            "name": "价值",
		            "id": 1344013
		        },
		        {
		            "name": "平衡",
		            "id": 1344012
		        },
		        {
		            "name": "成长",
		            "id": 1344011
		        },
		        {
		            "name": "综合",
		            "id": 1344010
		        }
		    ]
		}
    })
})

// 优选基金 （ 获取用户上次选择（输入）的条件 ）
app.get('/web/preferfund/condition/select', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "success",
		data: {
		    "scala": [
		        "小盘",
		        "中盘"
		    ],
		    "topic": [
		        "生物医疗"
		    ],
		    "value": [
		        "平衡"
		    ]
		}
    })
})

// 优选基金 （查询接口）
app.get('/web/preferfunds', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "success",
		count: 7459,
		data: [
		    {
		        "fundType": "货币市场基金",
		        "yieldRate": 3.73283,
		        "code": "180008",
		        "scala": null,
		        "rate": "未评级",
		        "name": "银华货币A",
		        "rank": 7,
		        "topic": "未知",
		        "value": null
		    },
		    {
		        "fundType": "货币市场基金",
		        "yieldRate": 3.98189,
		        "code": "180009",
		        "scala": null,
		        "rate": "未评级",
		        "name": "银华货币B",
		        "rank": 8,
		        "topic": "未知",
		        "value": null
		    },
		    {
		        "fundType": "货币市场基金",
		        "yieldRate": 3.84209,
		        "code": "370011",
		        "scala": null,
		        "rate": "未评级",
		        "name": "上投货币B",
		        "rank": 9,
		        "topic": "未知",
		        "value": null
		    },
		    {
		        "fundType": "货币市场基金",
		        "yieldRate": 3.97519,
		        "code": "150015",
		        "scala": null,
		        "rate": "未评级",
		        "name": "银河货币B",
		        "rank": 11,
		        "topic": "未知",
		        "value": null
		    },
		    {
		        "fundType": "货币市场基金",
		        "yieldRate": 3.90381,
		        "code": "420006",
		        "scala": null,
		        "rate": "未评级",
		        "name": "天弘货币A",
		        "rank": 12,
		        "topic": "未知",
		        "value": null
		    },
		    {
		        "fundType": "货币市场基金",
		        "yieldRate": 4.15297,
		        "code": "420106",
		        "scala": null,
		        "rate": "未评级",
		        "name": "天弘货币B",
		        "rank": 13,
		        "topic": "未知",
		        "value": null
		    },
		    {
		        "fundType": "货币市场基金",
		        "yieldRate": 3.95518,
		        "code": "000832",
		        "scala": null,
		        "rate": "未评级",
		        "name": "天弘货币C",
		        "rank": 14,
		        "topic": "未知",
		        "value": null
		    },
		    {
		        "fundType": "货币市场基金",
		        "yieldRate": 3.41009,
		        "code": "511800",
		        "scala": null,
		        "rate": "未评级",
		        "name": "易方达货币E",
		        "rank": 15,
		        "topic": "未知",
		        "value": null
		    },
		    {
		        "fundType": "货币市场基金",
		        "yieldRate": 3.90183,
		        "code": "001251",
		        "scala": null,
		        "rate": "未评级",
		        "name": "天弘货币D",
		        "rank": 16,
		        "topic": "未知",
		        "value": null
		    },
		    {
		        "fundType": "货币市场基金",
		        "yieldRate": 3.90069,
		        "code": "002847",
		        "scala": null,
		        "rate": "未评级",
		        "name": "天弘货币E",
		        "rank": 17,
		        "topic": "未知",
		        "value": null
		    }
		]
    })
})

// 优选基金 （删除基金）
app.post('/web/preferfund/condition', (req, res) => {
	res.json({
		responseCode: 20000,
		msg: "success",
		data: null
	})
})

// 优选基金 （设置）
app.delete('/web/preferfund/*', (req, res) => {
	res.json({
		responseCode: 20000,
		msg: "success",
		data: {}
	})
})


// 基金组合管理（初始化）
app.get('/web/fundgroup/condition', (req, res) => {
	res.json({
        responseCode: 20000,
        msg: "success",
        data: {
		    "fluidityPrefer": [
		        {
		            "name": "中期配置",
		            "id": 1
		        },
		        {
		            "name": "长期投资",
		            "id": 2
		        },
		        {
		            "name": "短期参与",
		            "id": 3
		        }
		    ],
		    "riskPrefer": [
		        {
		            "name": "激进型",
		            "id": 1
		        },
		        {
		            "name": "积极型",
		            "id": 2
		        },
		        {
		            "name": "平衡型",
		            "id": 3
		        },
		        {
		            "name": "稳健型",
		            "id": 4
		        },
		        {
		            "name": "保守型",
		            "id": 5
		        }
		    ]
		}
    })
})

// 基金组合管理 （查询接口）
app.get('/web/fundgroups', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "",
		count: 15,
		data: {
		    "detail": [
		        {
		            "date": "2014-07-01",
		            "reason": "根据您的状况，您比较适合一个以权益类资产为主，中期资产损失风险优化控制的基金组合，上证基智为您奉上“赤兔1号”。",
		            "code": 1,
		            "name": "赤兔1号"
		        },
		        {
		            "date": "2014-07-01",
		            "reason": "根据您的状况，您比较适合一个权益类资产较高，中期资产损失风险优化控制的基金组合，上证基智为您奉上“涌泉1号”。",
		            "code": 4,
		            "name": "涌泉1号"
		        },
		        {
		            "date": "2014-07-01",
		            "reason": "根据您的状况，您比较适合一个固定收益类为主，适当配置权益类，中期资产损失风险优化控制的基金组合，上证基智为您奉上“磐石1号”。",
		            "code": 10,
		            "name": "磐石1号"
		        },
		        {
		            "date": "2014-07-01",
		            "reason": "根据您的状况，您比较适合一个以权益类资产为主，中期资产损失风险优化控制的基金组合，上证基智为您奉上“赤兔1号”。",
		            "code": 1,
		            "name": "赤兔1号"
		        },
		        {
		            "date": "2014-07-01",
		            "reason": "根据您的状况，您比较适合一个以权益类资产为主，中期资产损失风险优化控制的基金组合，上证基智为您奉上“赤兔1号”。",
		            "code": 1,
		            "name": "赤兔1号"
		        },
		        {
		            "date": "2014-07-01",
		            "reason": "根据您的状况，您比较适合一个权益类资产较高，中期资产损失风险优化控制的基金组合，上证基智为您奉上“涌泉1号”。",
		            "code": 4,
		            "name": "涌泉1号"
		        },
		        {
		            "date": "2014-07-01",
		            "reason": "根据您的状况，您比较适合一个权益类和固定收益类相对均衡配置，中期资产损失风险优化控制的基金组合，上证基智为您奉上“平衡有道1号”。",
		            "code": 7,
		            "name": "平衡有道1号"
		        },
		        {
		            "date": "2014-07-01",
		            "reason": "根据您的状况，您比较适合一个权益类和固定收益类相对均衡配置，中期资产损失风险优化控制的基金组合，上证基智为您奉上“平衡有道1号”。",
		            "code": 7,
		            "name": "平衡有道1号"
		        },
		        {
		            "date": "2014-07-01",
		            "reason": "根据您的状况，您比较适合一个权益类和固定收益类相对均衡配置，中期资产损失风险优化控制的基金组合，上证基智为您奉上“平衡有道1号”。",
		            "code": 7,
		            "name": "平衡有道1号"
		        },
		        {
		            "date": "2014-07-01",
		            "reason": "根据您的状况，您比较适合一个权益类资产较高，中期资产损失风险优化控制的基金组合，上证基智为您奉上“涌泉1号”。",
		            "code": 4,
		            "name": "涌泉1号"
		        }
		    ]
		}
    })
})

// 基金组合管理 （上传）
app.post('/web/fundgroup/upload', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "",
		data: {}
    })
})

// 基金组合管理 （下载）
app.get('/web/fundgroup/download', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "",
		data: {}
    })
})

// 基金组合管理 （组合详情查询）
app.get('/web/fundgroup/[1-9]', (req, res) => {
	res.json({
		responseCode: 20000,
		msg: "success",
		data: [
		    {
		        "code": "040011",
		        "proportion": 0.2074,
		        "group_id": 1,
		        "name": "华安核心",
		        "typeId": 11,
		        "type": "混合型",
		        "seq": 1
		    },
		    {
		        "code": "110011",
		        "proportion": 0.087,
		        "group_id": 1,
		        "name": "易方达中小盘",
		        "typeId": 11,
		        "type": "混合型",
		        "seq": 2
		    },
		    {
		        "code": "202005",
		        "proportion": 0.1652,
		        "group_id": 1,
		        "name": "南方成份",
		        "typeId": 11,
		        "type": "混合型",
		        "seq": 3
		    },
		    {
		        "code": "260108",
		        "proportion": 0.1829,
		        "group_id": 1,
		        "name": "景顺成长",
		        "typeId": 11,
		        "type": "混合型",
		        "seq": 4
		    },
		    {
		        "code": "570005",
		        "proportion": 0.1984,
		        "group_id": 1,
		        "name": "诺德成长",
		        "typeId": 11,
		        "type": "混合型",
		        "seq": 5
		    },
		    {
		        "code": "000286",
		        "proportion": 0.138,
		        "group_id": 1,
		        "name": "银华季季红",
		        "typeId": 12,
		        "type": "债券型",
		        "seq": 6
		    },
		    {
		        "code": "003473",
		        "proportion": 0.0211,
		        "group_id": 1,
		        "name": "南方天天利A",
		        "typeId": 13,
		        "type": "货币型",
		        "seq": 7
		    }
		]
	})
})

// 基金组合标签管理 （上传）
app.post('/web/fundgroup/tags/upload', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "",
		data: {}
    })
})

// 基金组合标签管理 （下载）
app.get('/web/fundgroup/tags/download', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "",
		data: {}
    })
})

// 基金组合标签管理 （查询）
app.get('/web/fundgroup/tags', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "success",
		count: 15,
		data: {
		    "detail": [
		        {
		            "code": 1,
		            "name": "赤兔1号",
		            "fluidityPrefer": "中期配置",
		            "riskPrefer": "激进型"
		        },
		        {
		            "code": 4,
		            "name": "涌泉1号",
		            "fluidityPrefer": "中期配置",
		            "riskPrefer": "积极型"
		        },
		        {
		            "code": 7,
		            "name": "平衡有道1号",
		            "fluidityPrefer": "中期配置",
		            "riskPrefer": "平衡型"
		        },
		        {
		            "code": 10,
		            "name": "磐石1号",
		            "fluidityPrefer": "中期配置",
		            "riskPrefer": "稳健型"
		        },
		        {
		            "code": 13,
		            "name": "磐石4号",
		            "fluidityPrefer": "中期配置",
		            "riskPrefer": "保守型"
		        },
		        {
		            "code": 1,
		            "name": "赤兔1号",
		            "fluidityPrefer": "长期投资",
		            "riskPrefer": "激进型"
		        },
		        {
		            "code": 4,
		            "name": "涌泉1号",
		            "fluidityPrefer": "长期投资",
		            "riskPrefer": "积极型"
		        },
		        {
		            "code": 7,
		            "name": "平衡有道1号",
		            "fluidityPrefer": "长期投资",
		            "riskPrefer": "平衡型"
		        },
		        {
		            "code": 10,
		            "name": "磐石1号",
		            "fluidityPrefer": "长期投资",
		            "riskPrefer": "稳健型"
		        },
		        {
		            "code": 13,
		            "name": "磐石4号",
		            "fluidityPrefer": "长期投资",
		            "riskPrefer": "保守型"
		        }
		    ]
		}
    })
})

// 黑名单管理（下拉框）
app.get('/web/blacklist/condition', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "success",
		data: {
		    "fundType": [
		        {
		            "code": 1230,
		            "name": "债券分级子基金"
		        },
		        {
		            "code": 1240,
		            "name": "短期理财债券型"
		        },
		        {
		            "code": 1310,
		            "name": "货币市场基金"
		        },
		        {
		            "code": 1420,
		            "name": "QDII混合型"
		        },
		        {
		            "code": 1440,
		            "name": "QDII分级子基金"
		        },
		        {
		            "code": 1450,
		            "name": "其他QDII"
		        },
		        {
		            "code": 1510,
		            "name": "FOF"
		        },
		        {
		            "code": 1610,
		            "name": "封闭式股票型"
		        },
		        {
		            "code": 1620,
		            "name": "封闭式混合型"
		        },
		        {
		            "code": 1630,
		            "name": "封闭式债券型"
		        },
		        {
		            "code": 1710,
		            "name": "其他"
		        },
		        {
		            "code": 1410,
		            "name": "QDII股票型"
		        },
		        {
		            "code": 1430,
		            "name": "QDII债券型"
		        },
		        {
		            "code": 1120,
		            "name": "指数型混合基金"
		        },
		        {
		            "code": 1130,
		            "name": "混合分级子基金"
		        },
		        {
		            "code": 1140,
		            "name": "保本型基金"
		        },
		        {
		            "code": 1210,
		            "name": "主动投资债券基金"
		        },
		        {
		            "code": 1220,
		            "name": "指数型债券基金"
		        },
		        {
		            "code": 1010,
		            "name": "主动投资股票基金"
		        },
		        {
		            "code": 1020,
		            "name": "指数型股票基金"
		        },
		        {
		            "code": 1030,
		            "name": "股票分级子基金"
		        },
		        {
		            "code": 1110,
		            "name": "主动投资混合基金"
		        }
		    ],
		    "company": [
		        {
		            "code": "6129",
		            "name": "华夏基金"
		        },
		        {
		            "code": "2530",
		            "name": "诺安基金"
		        },
		        {
		            "code": "40696",
		            "name": "华宝基金"
		        },
		        {
		            "code": "7919",
		            "name": "国泰君安"
		        },
		        {
		            "code": "2436",
		            "name": "华安基金"
		        }
		    ]
		}
    })
})

// 黑名单管理（数量）
app.get('/web/blacklist/count', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "success",
		data: {
			count: 42
		}
	})
})	

// 黑名单管理（查询）
app.get('/web/blacklists', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "success",
		count: 41,
		data: {
		    "detail": [
		        {
		            "code": "000832",
		            "fundTypeName": "货币市场基金",
		            "companyName": "诺安基金",
		            "name": "天弘货币C"
		        },
		        {
		            "code": "000866",
		            "fundTypeName": "主动投资股票基金",
		            "companyName": "华宝基金",
		            "name": "华宝制造"
		        },
		        {
		            "code": "000867",
		            "fundTypeName": "主动投资股票基金",
		            "companyName": "华宝基金",
		            "name": "华宝生活"
		        },
		        {
		            "code": "000993",
		            "fundTypeName": "主动投资混合基金",
		            "companyName": "华宝基金",
		            "name": "华宝回报"
		        },
		        {
		            "code": "001118",
		            "fundTypeName": "主动投资混合基金",
		            "companyName": "华宝基金",
		            "name": "华宝驱动"
		        },
		        {
		            "code": "004284",
		            "fundTypeName": "封闭式混合型",
		            "companyName": "华宝基金",
		            "name": "华宝新优选"
		        },
		        {
		            "code": "320002",
		            "fundTypeName": "货币市场基金",
		            "companyName": "诺安基金",
		            "name": "诺安货币A"
		        },
		        {
		            "code": "320003",
		            "fundTypeName": "主动投资混合基金",
		            "companyName": "诺安基金",
		            "name": "诺安先锋"
		        },
		        {
		            "code": "320004",
		            "fundTypeName": "主动投资债券基金",
		            "companyName": "诺安基金",
		            "name": "诺安优化"
		        },
		        {
		            "code": "320005",
		            "fundTypeName": "主动投资混合基金",
		            "companyName": "诺安基金",
		            "name": "诺安价值"
		        }
		    ]
		}
	})
})	

// 黑名单管理（上传）
app.post('/web/blacklist/upload', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "success",
		data: {}
	})
})	

// 黑名单管理（下载）
app.get('/web/blacklist/download', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "success",
		data: {}
	})
})

// 黑名单管理 （删除）
app.delete('/web/blacklist/*', (req, res) => {
	res.json({
		responseCode: 20000,
		msg: "success",
		data: {}
	})
})	

// 基金组合提示管理（查询）
app.get('/web/fundgroup/prompt', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "success",
		count: 22,
		data: [
		    {
		        "id": 1,
		        "groupCode": "1",
		        "groupName": "赤兔1号",
		        "fundCode": "040011",
		        "fundName": "华安核心优选",
		        "fundProportion": 0.2052037,
		        "typeId": "1",
		        "typeName": "组合中基金发生估值调整",
		        "content": "组合所持有基金公告显示估值发生调整。",
		        "date": "20180814",
		        "status": "0"
		    },
		    {
		        "id": 2,
		        "groupCode": "1",
		        "groupName": "赤兔1号",
		        "fundCode": "110011",
		        "fundName": "易方达中小盘",
		        "fundProportion": 0.0873042,
		        "typeId": "2",
		        "typeName": "组合中基金持有的证券发生异常事件",
		        "content": "组合所持有基金最新披露的重仓股中，股票长期停牌与债券违约",
		        "date": "20180814",
		        "status": "0"
		    },
		    {
		        "id": 3,
		        "groupCode": "10",
		        "groupName": "磐石1号",
		        "fundCode": "",
		        "fundName": "",
		        "fundProportion": null,
		        "typeId": "3",
		        "typeName": "组合风格漂移",
		        "content": "根据客户标签，对组合标签进行匹配，一致不提醒，若组合标签生成后不一致，提醒",
		        "date": "20180814",
		        "status": "0"
		    },
		    {
		        "id": 4,
		        "groupCode": "4",
		        "groupName": "涌泉1号",
		        "fundCode": "040011",
		        "fundName": "华安核心优选",
		        "fundProportion": 0.1194015247,
		        "typeId": "1",
		        "typeName": "组合中基金发生估值调整",
		        "content": "组合中基金发生估值调整",
		        "date": "20180814",
		        "status": "0"
		    },
		    {
		        "id": 5,
		        "groupCode": "4",
		        "groupName": "涌泉1号",
		        "fundCode": "202005",
		        "fundName": "南方成份精选",
		        "fundProportion": 0.1602746092,
		        "typeId": "2",
		        "typeName": "组合中基金持有的证券发生异常事件",
		        "content": "组合所持有基金最新披露的重仓股中，股票长期停牌与债券违约",
		        "date": "20180814",
		        "status": "0"
		    },
		    {
		        "id": 6,
		        "groupCode": "13",
		        "groupName": "磐石4号",
		        "fundCode": "",
		        "fundName": "",
		        "fundProportion": null,
		        "typeId": "3",
		        "typeName": "组合风格漂移",
		        "content": "根据客户标签，对组合标签进行匹配，一致不提醒，若组合标签生成后不一致，提醒",
		        "date": "20180814",
		        "status": "0"
		    },
		    {
		        "id": 7,
		        "groupCode": "7",
		        "groupName": "平衡有道1号",
		        "fundCode": "202005",
		        "fundName": "南方成份精选",
		        "fundProportion": 0.0797270653,
		        "typeId": "2",
		        "typeName": "组合中基金持有的证券发生异常事件",
		        "content": "组合所持有基金最新披露的重仓股中，股票长期停牌与债券违约",
		        "date": "20180814",
		        "status": "0"
		    },
		    {
		        "id": 8,
		        "groupCode": "7",
		        "groupName": "平衡有道1号",
		        "fundCode": "260112",
		        "fundName": "景顺长城能源基建",
		        "fundProportion": 0.1974695,
		        "typeId": "2",
		        "typeName": "组合中基金持有的证券发生异常事件",
		        "content": "组合所持有基金最新披露的重仓股中，股票长期停牌与债券违约",
		        "date": "20180814",
		        "status": "0"
		    },
		    {
		        "id": 9,
		        "groupCode": "7",
		        "groupName": "平衡有道1号",
		        "fundCode": "570005",
		        "fundName": "诺德成长优势",
		        "fundProportion": 0.1700986,
		        "typeId": "1",
		        "typeName": "组合中基金发生估值调整",
		        "content": "组合所持有基金公告显示估值发生调整",
		        "date": "20180814",
		        "status": "0"
		    },
		    {
		        "id": 10,
		        "groupCode": "7",
		        "groupName": "平衡有道1号",
		        "fundCode": "000032",
		        "fundName": "易方达信用债A",
		        "fundProportion": 0.1647132655,
		        "typeId": "1",
		        "typeName": "组合中基金发生估值调整",
		        "content": "组合所持有基金公告显示估值发生调整",
		        "date": "20180814",
		        "status": "0"
		    }
		]
	})
})

// 基金组合提示管理（查询）
app.put('/web/fundgroup/prompt', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "success",
		data: null
	})
})

// 基金提示管理（查询）
app.get('/web/fund/prompt', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "success",
		count: 11,
		data: [
		    {
		        "id": 1,
		        "fundCode": "040011",
		        "fundName": "华安核心优选",
		        "typeId": "1",
		        "typeName": "基金公司核心人物变动",
		        "content": "基金公司核心人物离开。",
		        "date": "20180814",
		        "status": "0"
		    },
		    {
		        "id": 2,
		        "fundCode": "110011",
		        "fundName": "易方达中小盘",
		        "typeId": "2",
		        "typeName": "基金经理变动",
		        "content": "该产品基金经理发生变化。",
		        "date": "20180814",
		        "status": "1"
		    },
		    {
		        "id": 3,
		        "fundCode": "202005",
		        "fundName": "南方成份精选",
		        "typeId": "3",
		        "typeName": "基金产品转型",
		        "content": "发生转型，且投资策略、运作方式发生显著变化",
		        "date": "20180814",
		        "status": "1"
		    },
		    {
		        "id": 4,
		        "fundCode": "040011",
		        "fundName": "华安核心优选",
		        "typeId": "1",
		        "typeName": "基金公司核心人物变动",
		        "content": "基金公司核心人物离开。",
		        "date": "20180814",
		        "status": "0"
		    },
		    {
		        "id": 5,
		        "fundCode": "202005",
		        "fundName": "南方成份精选",
		        "typeId": "2",
		        "typeName": "基金经理变动",
		        "content": "该产品基金经理发生变化。",
		        "date": "20180814",
		        "status": "1"
		    },
		    {
		        "id": 6,
		        "fundCode": "260112",
		        "fundName": "景顺长城能源基建",
		        "typeId": "3",
		        "typeName": "基金产品转型",
		        "content": "发生转型，且投资策略、运作方式发生显著变化",
		        "date": "20180814",
		        "status": "1"
		    },
		    {
		        "id": 7,
		        "fundCode": "202005",
		        "fundName": "南方成份精选",
		        "typeId": "2",
		        "typeName": "基金经理变动",
		        "content": "该产品基金经理发生变化。",
		        "date": "20180814",
		        "status": "1"
		    },
		    {
		        "id": 8,
		        "fundCode": "260112",
		        "fundName": "景顺长城能源基建",
		        "typeId": "2",
		        "typeName": "基金经理变动",
		        "content": "该产品基金经理发生变化。",
		        "date": "20180814",
		        "status": "1"
		    },
		    {
		        "id": 9,
		        "fundCode": "570005",
		        "fundName": "诺德成长优势",
		        "typeId": "1",
		        "typeName": "基金公司核心人物变动",
		        "content": "基金公司核心人物离开。",
		        "date": "20180814",
		        "status": "1"
		    },
		    {
		        "id": 10,
		        "fundCode": "000032",
		        "fundName": "易方达信用债A",
		        "typeId": "1",
		        "typeName": "基金公司核心人物变动",
		        "content": "基金公司核心人物离开。",
		        "date": "20180814",
		        "status": "1"
		    }
		]
	})
})

// 基金提示管理（查询）
app.put('/web/fund/prompt', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "success",
		data: null
	})
})

// 站内信
app.get('/web/fundgroup/alert', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "success",
		count: 11,
		data: [
		    {
		        "id": 1,
		        "groupCode": "1",
		        "groupName": "赤兔1号",
		        "typeId": "1",
		        "typeName": "经理跑路",
		        "content": "经理人离职，组合有风险",
		        "date": "20180807",
		        "status": 1
		    },
		    {
		        "id": 2,
		        "groupCode": "1",
		        "groupName": "赤兔1号",
		        "typeId": "2",
		        "typeName": "行业舆论",
		        "content": "医药行业最近有舆论风险，请谨慎购买",
		        "date": "20180807",
		        "status": 1
		    },
		    {
		        "id": 3,
		        "groupCode": "10",
		        "groupName": "磐石1号",
		        "typeId": "1",
		        "typeName": "经理跑路",
		        "content": "经理人离职，组合有风险",
		        "date": "20180807",
		        "status": 0
		    },
		    {
		        "id": 4,
		        "groupCode": "10",
		        "groupName": "磐石1号",
		        "typeId": "2",
		        "typeName": "行业舆论",
		        "content": "医药行业最近有舆论风险，请谨慎购买",
		        "date": "20180807",
		        "status": 0
		    },
		    {
		        "id": 5,
		        "groupCode": "10",
		        "groupName": "磐石1号",
		        "typeId": "3",
		        "typeName": "公司负面新闻",
		        "content": "相关公司传出不良新闻，基金产品有风险",
		        "date": "20180807",
		        "status": 0
		    },
		    {
		        "id": 6,
		        "groupCode": "7",
		        "groupName": "平衡有道1号",
		        "typeId": "1",
		        "typeName": "经理跑路",
		        "content": "经理人离职，组合有风险",
		        "date": "20180807",
		        "status": 0
		    },
		    {
		        "id": 7,
		        "groupCode": "7",
		        "groupName": "平衡有道1号",
		        "typeId": "2",
		        "typeName": "行业舆论",
		        "content": "医药行业最近有舆论风险，请谨慎购买",
		        "date": "20180807",
		        "status": 0
		    },
		    {
		        "id": 8,
		        "groupCode": "7",
		        "groupName": "平衡有道1号",
		        "typeId": "3",
		        "typeName": "公司负面新闻",
		        "content": "相关公司传出不良新闻，基金产品有风险",
		        "date": "20180807",
		        "status": 0
		    },
		    {
		        "id": 9,
		        "groupCode": "4",
		        "groupName": "涌泉1号",
		        "typeId": "1",
		        "typeName": "经理跑路",
		        "content": "经理人离职，组合有风险",
		        "date": "20180807",
		        "status": 1
		    },
		    {
		        "id": 10,
		        "groupCode": "4",
		        "groupName": "涌泉1号",
		        "typeId": "2",
		        "typeName": "行业舆论",
		        "content": "医药行业最近有舆论风险，请谨慎购买",
		        "date": "20180807",
		        "status": 1
		    }
		]
	})
})

app.listen(3000);


