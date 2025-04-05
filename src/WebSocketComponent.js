import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Game from './Game';

const WebSocketComponent = ({ player }) => {
    const [players, setPlayers] = useState([]); // 다른 플레이어들의 상태
    const [isConnected, setIsConnected] = useState(false);
    const [playerData, setPlayerData] = useState(player);

    useEffect(() => {
        if (!player) return;

        const client = new Client({
            brokerURL: 'ws://localhost:8080/chat',
            onConnect: () => {
                setIsConnected(true);

                // 다른 플레이어들의 위치 정보를 수신
                client.subscribe('/topic/players', (message) => {
                    const updatedPlayer = JSON.parse(message.body);
                    setPlayers((prev) => [...prev.filter(p => p.id !== updatedPlayer.id), updatedPlayer]);
                });

                // 현재 플레이어 등록
                client.publish({
                    destination: '/app/register',
                    body: JSON.stringify(player)
                });
            },
            webSocketFactory: () => new SockJS('http://localhost:8080/chat'),
        });

        client.activate();

        // 플레이어 위치 업데이트
        const movePlayer = () => {
            if (client.connected) {
                client.publish({
                    destination: '/app/move',
                    body: JSON.stringify(playerData)
                });
            }
        };

        // 일정 주기로 플레이어 위치 전송
        const moveInterval = setInterval(movePlayer, 1000);

        return () => {
            client.deactivate();
            clearInterval(moveInterval);
        };
    }, [playerData]);  // playerData가 바뀔 때마다 실행

    return (
        <div>
            <h2>{player?.username || '이름 없음'}의 화면</h2>
            {isConnected && <Game players={players} />} {/* players를 Game 컴포넌트로 전달 */}
        </div>
    );
};

export default WebSocketComponent;
