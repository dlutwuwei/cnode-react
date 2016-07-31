function ajax(opts) {
    const options = opts || {};
    options.type = (options.type || 'GET').toUpperCase();
    options.dataType = options.dataType || 'json';
    const params = formatParams(options.data);
    let xhr;
    // 创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 接收 - 第三步
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            const status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    };

    // 连接 和 发送 - 第二步
    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + params, true);
        xhr.send(null);
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url, true);
        // 设置表单提交时的内容类型
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }
}
// 格式化参数
function formatParams(data) {
    const arr = [];
    if (data) {
        for (const name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
    }
    //arr.push(('v=' + Math.random()).replace('.'));
    return arr.join('&');
}

export default (url, data) => {
    return new Promise((resolve, reject) => {
        ajax({
            type: 'POST',
            url: url,
            data: data,
            success: (responseData) => {
                resolve(responseData);
            },
            fail: () => {
                reject();
            }
        });
    });
};
