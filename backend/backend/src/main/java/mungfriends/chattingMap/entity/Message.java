package mungfriends.chattingMap.entity;

import jakarta.persistence.*;
import mungfriends.chattingMap.dto.request.chat.MessageType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@Getter
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ChatRoom chatRoom;

    @ManyToOne
    private Member sender;

    private String content;
    private String senderName;
    private LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    private MessageType type; // 메시지 타입 (CHAT, JOIN, LEAVE 등)

    public Message(ChatRoom chatRoom, Member member, String content, MessageType type, String senderName) {
        this.chatRoom = chatRoom;
        this.sender = member;
        this.content = content;
        this.type = type;
        this.timestamp = LocalDateTime.now();
        this.senderName = senderName;
    }
}

