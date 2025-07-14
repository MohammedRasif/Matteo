const token = localStorage.getItem("access_token")
const wsGloval = new WebSocket(`ws://172.252.13.96:7000/ws/api/v1/chat/?Authorization=Bearer ${token}`);
console.log(wsGloval,"gloval");

export default wsGloval;