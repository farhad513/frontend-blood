import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
console.log(import.meta.env.VITE_SOCKET_SERVER_URL);
const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
    withCredentials: true,
    transports: ['websocket']
});

export const useSocket = () => {
    const [activeUsers, setActiveUsers] = useState([]);
    const [activeHospitals, setActiveHospitals] = useState([]);
    const [adminStatus, setAdminStatus] = useState(false);

    useEffect(() => {
        // listen for active customer list
        socket.on('activeUser', (Users) => {
            setActiveUsers(Users);
        });

        // listen for active seller list
        socket.on('activeHospital', (hospitals) => {
            setActiveHospitals(hospitals);
        });

        // listen for admin online status
        socket.on('activeAdmin', (data) => {
            setAdminStatus(data.status);
        });

        // clean up on unmount
        return () => {
            socket.off('activeUsers');
            socket.off('activeHospitals');
            socket.off('activeAdmin');
        };
    }, []);

    return { socket, activeUsers, activeHospitals, adminStatus };
};
