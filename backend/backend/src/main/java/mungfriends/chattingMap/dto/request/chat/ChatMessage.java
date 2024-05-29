package mungfriends.chattingMap.dto.request.chat;

import mungfriends.chattingMap.entity.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    private MessageType type; // 메시지 타입 (CHAT, JOIN, LEAVE 등)
    private String content; // 메시지 내용
    private String sender; // 보내는 사람
    private String roomId; // 채팅방 ID
    private String senderName; // 보내는사람 이름

    public ChatMessage(String content) {
        this.content = content;
    }

    public ChatMessage(Message message) {
        this.content = message.getContent();
        this.type = message.getType();
        this.sender = message.getSender().getOriginUsername();
        this.roomId = message.getChatRoom().getRoomId();
        this.senderName = message.getSender().getNickname();
    }
}
