package mungfriends.chattingMap.dto.request.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MyChattingRooms {
    private List<MyChattingRoom> chatRooms;
}
