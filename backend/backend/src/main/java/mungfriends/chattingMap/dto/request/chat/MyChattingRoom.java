package mungfriends.chattingMap.dto.request.chat;

import mungfriends.chattingMap.entity.ChatRoom;
import mungfriends.chattingMap.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MyChattingRoom {
    private String nickname; // 내가 아닌 사용자
    private String roomId;

    public MyChattingRoom(ChatRoom chatRoom, Member loginUser) {
        List<Member> members = chatRoom.getMembers();
        for (Member m : members) {
            if(!m.getEmail().equals(loginUser.getEmail())) {
                this.nickname = m.getNickname();
            }
        }
        this.roomId = chatRoom.getRoomId();
    }
}
