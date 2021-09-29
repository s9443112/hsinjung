import $ from "jquery";

var pad = "";
if (process.env.REACT_APP_BACKEND_URL[process.env.REACT_APP_BACKEND_URL.length - 1] !== "/") {
    pad = "/";
}
function parseCookie() {
    var cookieObj = {};
    var cookieAry = document.cookie.split(';');
    var cookie;

    for (var i = 0, l = cookieAry.length; i < l; ++i) {
        cookie = $.trim(cookieAry[i]);
        cookie = cookie.split('=');
        cookieObj[cookie[0]] = cookie[1];
    }

    return cookieObj;
}
function getCookieByName(name) {
    var value = parseCookie()[name];
    if (value) {
        value = decodeURIComponent(value);
    }

    return value;
}


async function post(url, data, type = "POST") {
    if (url[0] === "/") {
        url = url.substr(1);
    }
    if (typeof data !== "string") {
        data = JSON.stringify(data);
    }
    try {
        return await $.ajax({
            url: process.env.REACT_APP_BACKEND_URL + pad + url,
            data: data,
            contentType: "application/json",
            dataType: "json",
            crossDomain: true,
            xhrFields: { withCredentials: true },
            method: type
        });
    } catch (error) {
        console.log(error)
        console.log(pad + url)
        return checkLoginError(error);
        // checkLoginError(error);
        throw error;
    }
}

async function get(url, params = {}) {
    if (url[0] === "/") {
        url = url.substr(1);
    }
    try {
        let URL = new window.URL(process.env.REACT_APP_BACKEND_URL + pad + url);
        for (let param in params) {
            if (params[param] !== null && params[param] !== undefined) {
                URL.searchParams.set(param, params[param]);
            }
        }
        return await $.ajax({
            url: URL.href,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            mode: "cors",
            credentials: "include",
        });

    } catch (error) {
        console.log(error)
        console.log(pad + url)
        return checkLoginError(error);
        throw error;
    }
}

function checkLoginError(error) {
    let result = {
        "type": 2,
        "error": error
    }
    return result
}



export function use_getCookieByName(key) {
    return getCookieByName(key)
}


export async function login(data) {
    return (await post("/api/login", data))
}
export async function info() {
    return (await get("/api/info"))
}
export async function get_machine() {
    return (await get("/api/machine"))
}

export async function get_machines_data() {
    return (await get("/api/get_machines_data"))
}

export async function insert_formula(data) {
    return (await post("/api/insert_formula", data))
}

export async function select_formula() {
    return (await get("/api/formula"))
}
export async function insert_disptch_config(data) {
    return (await post("/api/insert_disptch_config", data))
}
export async function update_dispatch_config(data) {
    return (await post("/api/update_dispatch_config", data))
}
export async function select_sensor_per(data) {
    return (await post("/api/select_sensor_per", data))
}

export async function select_dispatch_config() {
    return (await get("/api/select_dispatch_config"))
}



export async function update_formula(data) {
    return (await post("/api/formula", data, 'PUT'))
}

export async function get_user() {
    return (await get(`/api/get_user`))
}

export async function for_browser() {
    return (await get(`/api/for_browser`))
}

export async function for_browser_time(data) {
    return (await post(`/api/for_browser_time`,data))
}

export async function create_user(data) {
    return (await post("/api/create_user", data))
}
export async function delete_user(data) {
    return (await post("/api/delete_user", data))
}

export async function get_function() {
    return (await get("/api/get_function"))
}
export async function change_function(data) {
    return (await post("/api/change_function", data))
}

export async function other_info(data) {
    return (await post("/api/other_info", data)).data
}



export async function get_setting() {
    return (await get(`/api/setting`))
}
export async function modify_setting(data) {
    return (await post(`/api/modify_setting`,data))
}
