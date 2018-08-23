import { baseUrl } from './env'

window.urlEncode = function (param, key, encode) {  
  if(param==null) return '';  
  var paramStr = '';  
  var t = typeof (param);  
  if (t == 'string' || t == 'number' || t == 'boolean') {  
    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);  
  } else {  
    for (var i in param) {  
      // var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i); 
      var k = key == null ? i : key + (param instanceof Array ? '[]' : '.' + i);  
      paramStr += window.urlEncode(param[i], k, encode);  
    }  
  }  
  return paramStr;  
};  

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		// Object.keys(data).forEach(key => {
		// 	dataStr += key + '=' + data[key] + '&';
		// })

		dataStr = window.urlEncode(data)
		dataStr = dataStr.substr(1,dataStr.length-1);

		if (dataStr !== '') {
			// dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	if (window.fetch && method == 'fetch' && 0) {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		
		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST' || type == 'DELETE' || type == 'PUT') {
				// let params = [];
				// for (var key in data){
				// 	params.push(key + '=' + data[key]);
				// }

				// sendData = params.join('&');

				sendData = window.urlEncode(data)
				sendData = sendData.substr(1,sendData.length-1);
			}

			requestObj.open(type, url, true);
			requestObj.withCredentials = true;
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						requestObj.statusError = true;
						resolve(requestObj)
					}
				}
			}
		})
	}
}