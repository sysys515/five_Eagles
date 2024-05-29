package mungfriends.chattingMap.repository;

import mungfriends.chattingMap.entity.ChatRoom;
import mungfriends.chattingMap.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatRoom(ChatRoom chatRoom);
}
