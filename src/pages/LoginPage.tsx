// import React, { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';
// import { Client, Message, over } from 'stompjs';
//
// interface RegisterResponse {
//     status: string;
//     error?: string;
// }
//
// const LoginPage: React.FC = () => {
//     const [stompClient, setStompClient] = useState<Client | null>(null);
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [responseMsg, setResponseMsg] = useState('');
//
//     useEffect(() => {
//         // Подключаемся к /ws на сервере
//         const socket = new SockJS('http://localhost:8080/ws');
//         const client = over(socket);
//
//         // Устанавливаем соединение
//         client.connect({}, () => {
//             console.log('Connected to STOMP');
//
//             // Подписываемся на /topic/registerResult
//             client.subscribe('/topic/registerResult', (message: Message) => {
//                 const data: RegisterResponse = JSON.parse(message.body);
//                 if (data.status === 'success') {
//                     setResponseMsg('Регистрация прошла успешно!');
//                 } else if (data.status === 'error') {
//                     setResponseMsg(`Ошибка: ${data.error}`);
//                 }
//             });
//         }, (error) => {
//             console.error('Ошибка подключения STOMP: ', error);
//         });
//
//         setStompClient(client);
//
//         // Отключаемся при размонтировании компонента
//         return () => {
//             if (client.connected) {
//                 client.disconnect(() => {
//                     console.log('Disconnected from STOMP');
//                 });
//             }
//         };
//     }, []);
//
//     // Отправка формы
//     const handleRegister = (event: React.FormEvent) => {
//         event.preventDefault();
//         if (!stompClient || !stompClient.connected) {
//             setResponseMsg('Нет подключения к серверу');
//             return;
//         }
//         stompClient.send('/app/register', {}, JSON.stringify({
//             username,
//             password,
//         }));
//     };
//
//     return (
//         <div style={{maxWidth: 400, margin: 'auto', padding: 20}}>
//             <h1>Регистрация</h1>
//             <form onSubmit={handleRegister}>
//                 <div>
//                     <label>Логин</label><br/>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Пароль</label><br/>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">Зарегистрироваться</button>
//             </form>
//             {responseMsg && <p>{responseMsg}</p>}
//         </div>
//     );
// };
//
// export default LoginPage;
