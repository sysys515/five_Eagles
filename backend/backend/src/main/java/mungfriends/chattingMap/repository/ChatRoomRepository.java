package mungfriends.chattingMap.repository;

import mungfriends.chattingMap.entity.ChatRoom;
import mungfriends.chattingMap.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findByRoomId(String roomId);

    List<ChatRoom> findByMembersContaining(Member member);
}
