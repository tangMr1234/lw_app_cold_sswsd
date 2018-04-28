// import axios from 'axios';

//cell.vue组件页面数据获取
export const getCellData = params => { return axios.get('src/api/cellData.json', params).then(res => res.data); };
//Message.vue获取报警消息
export const getMessage = params => { return axios.get('http://services.pujiajia.com/message', params).then(res => res.data); };
