import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HttpHeadersContext } from '../context/HttpHeadersProvider';
import { ListGroup } from 'react-bootstrap';

const MyChatRooms = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const { headers, setHeaders } = useContext(HttpHeadersContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const response = await axios.get('http://localhost:8080/myChatRooms', {headers});
                setChatRooms(response.data.chatRooms);
                console.log(response.data.chatRooms);
            } catch (error) {
                console.error('Error fetching chat rooms:', error);
            }
        };

        fetchChatRooms();
    }, []);

    const handleChatRoomClick = (chatRoomId) => {
        navigate(`/chat`, { state: { chatRoomId } });
    };

    return (
        <div>
            <h2>내 채팅방</h2>
            <ListGroup>
                {chatRooms.map(room => (
                    <ListGroup.Item
                        key={room.roomId}
                        action
                        onClick={() => handleChatRoomClick(room.roomId)}
                        variant="success"
                        className="rounded"
                    >
                        <strong>{room.nickname}</strong>님과의 대화방
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default MyChatRooms;
