var express = require("express");
var bodyParser = require('body-parser');
var app = express();

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
// app.use('/login', express.static('./dist/index.html'));
// app.use('/admin/*', express.static('./dist/index.html'));

// 登录
app.post('/web/login', (req, res) => {
	const userName = req.body.userName;
	const password = req.body.password;

	if((userName == '123' && password == '123') || (userName == 'spen' && password == 'B2FCDCFBFCDCBAB5')){
		res.json({
	        responseCode: 20000,
	        msg: '',
	        data: {
	        	userId: 'B2FCDCFBFCDCBAB5',
	        	userName: 'spen'
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
app.get('/web/user/B2FCDCFBFCDCBAB5/permission', (req, res) => {
	res.json({
	   "responseCode":20000,
	   "msg":"",
	   "data":{
	       "permissions":[
	           {
	               "permissionId":1,
	               "permissonName":"优选基金管理",
	               "view":true,
	               "modify":true
	           },
	           {
	               "permissionId":2,
	               "permissonName":"基金组合管理",
	               "view":true,
	               "modify":false
	           },
	           {
	               "permissionId":3,
	               "permissonName":"基金组合标签管理",
	               "view":true,
	               "modify":false
	           },
	           {
	               "permissionId":4,
	               "permissonName":"黑名单管理",
	               "view":true,
	               "modify":false
	           },
	            {
	               "permissionId":5,
	               "permissonName":"基金预警管理",
	               "view":true,
	               "modify":false
	           }
	       ]
	   }
	})
})

// 获取用户信息
app.get('/web/user/info', (req, res) => {
	res.json({
        responseCode: 20000,
        data: {
        	userId: 'B2FCDCFBFCDCBAB5',
	        userName: 'spen'
        }
    })
})

// 优选基金（初始化）
app.get('/web/preferfund/condition', (req, res) => {
	res.json({
        responseCode: 20000,
        msg: "",
        data: {
	       "scala":[
	           {
	               "id":"B2FCDCFBFCDCBAB1",
	               "name":"规模风格1"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB2",
	               "name":"规模风格2"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB3",
	               "name":"规模风格3"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB4",
	               "name":"规模风格4"
	           }
	       ],
	       "value":[
	           {
	               "id":"B2FCDCFBFCDCBAB1",
	               "name":"价值风格1"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB2",
	               "name":"价值风格2"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB3",
	               "name":"价值风格3"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB4",
	               "name":"价值风格4"
	           }
	       ],
	        "topic":[
	           {
	               "id":"B2FCDCFBFCDCBAB1",
	               "name":"热门主题1"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB2",
	               "name":"热门主题2"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB3",
	               "name":"热门主题3"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB4",
	               "name":"热门主题4"
	           }
	       ]
        }
    })
})

// 优选基金 （ 获取用户上次选择（输入）的条件 ）
app.get('/web/preferfund/condition/select', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "",
		data: {
			"scala": {
               "id":"B2FCDCFBFCDCBAB1",
               "name":"规模风格1"
           },
	       "value": {
               "id":"B2FCDCFBFCDCBAB1",
               "name":"价值风格1"
           },
	        "topic": [
	        	{
	               "id":"B2FCDCFBFCDCBAB4",
	               "name":"热门主题4"
           		},
           		{
	               "id":"B2FCDCFBFCDCBAB3",
	               "name":"热门主题3"
	            }
           ]
		}
    })
})

// 优选基金 （查询接口）
app.get('/web/preferfunds', (req, res) => {
	const arr = [];

	for(let i = 0; i < 10; i++){
		arr.push({
           "code":`xxx_${i}_page${req.query.page}`,
           "name":`xxx_${i}_page${req.query.page}`,
           "type":`xxx_${i}_page${req.query.page}`,
           "feture":`xxx_${i}_page${req.query.page}`,
		});
	}

	res.json({
        responseCode: 20000,
		msg: "",
		count: 103,
		data: arr
    })
})

// 优选基金 （删除基金）
app.get('/web/preferfund/*', (req, res) => {
	res.json({
		responseCode: 20000,
		msg: "删除成功",
		data: {}
	})
})

// 基金组合管理（初始化）
app.get('/web/fundgroup/condition', (req, res) => {
	res.json({
        responseCode: 20000,
        msg: "",
        data: {
	       "riskPrefer":[
	           {
	               "id":"B2FCDCFBFCDCBAB1",
	               "name":"xx1"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB2",
	               "name":"xx2"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB3",
	               "name":"xx3"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB4",
	               "name":"xx3"
	           }
	       ],
	       "fluidityPrefer":[
	           {
	               "id":"B2FCDCFBFCDCBAB1",
	               "name":"oo1"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB2",
	               "name":"oo2"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB3",
	               "name":"oo3"
	           },
	           {
	               "id":"B2FCDCFBFCDCBAB4",
	               "name":"oo4"
	           }
	       ]
        }
    })
})

// 基金组合管理 （查询接口）
app.get('/web/fundgroups', (req, res) => {
	const arr = [];

	for(let i = 0; i < 10; i++){
		arr.push({
           "id":`xxx_${i}_page${req.query.page}`,
           "name":`xxx_${i}_page${req.query.page}`
		});
	}

	res.json({
        responseCode: 20000,
		msg: "",
		count: 150,
		data: arr
    })
})

// 基金组合管理 （上传）
app.post('/web/fundgroup/tags/upload', (req, res) => {
	res.json({
        responseCode: 20000,
		msg: "",
		data: {}
    })
})

app.listen(3000);


