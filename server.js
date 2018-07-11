var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

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
	               "permissionId":"1",
	               "permissionName":"优选基金管理",
	               "view":true,
	               "modify":false
	           },
	           {
	               "permissionId":"2",
	               "permissionName":"基金组合管理",
	               "view":true,
	               "modify":false
	           },
	           {
	               "permissionId":"3",
	               "permissionName":"基金组合标签管理",
	               "view":true,
	               "modify":false
	           },
	           {
	               "permissionId":"4",
	               "permissionName":"黑名单管理",
	               "view":true,
	               "modify":false
	           },
	            {
	               "permissionId":"5",
	               "permissionName":"基金预警管理",
	               "view":true,
	               "modify":false
	           }
	       ]
	   }
	})
})

app.listen(3000);


