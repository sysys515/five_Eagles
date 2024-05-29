package mungfriends.chattingMap.controller;

import mungfriends.chattingMap.dto.request.chat.ChatMessage;
import mungfriends.chattingMap.dto.request.chat.MyChattingRooms;
import mungfriends.chattingMap.entity.Member;
import mungfriends.chattingMap.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(ChatMessage message) {
        chatService.processSendMessage(message);
    }

    @GetMapping("/myChatRooms")
    public ResponseEntity<MyChattingRooms> getMyChatRooms(@AuthenticationPrincipal Member member) {
        MyChattingRooms myChatRooms = chatService.findMyRooms(member);
        return ResponseEntity.status(HttpStatus.OK).body(myChatRooms);
    }

    @GetMapping("/findMessage")
    public ResponseEntity<List<ChatMessage>> findMessage(String chatRoomId) {
        List<ChatMessage> messages = chatService.findMessage(chatRoomId);
        return ResponseEntity.status(HttpStatus.OK).body(messages);
    }

    @PostMapping("/createChatRoom")
    public ResponseEntity<String> createChatRoom(@RequestParam Long member1Id, @RequestParam Long member2Id) {
        String roomId = chatService.createChatRoomByIds(member1Id, member2Id);
        return ResponseEntity.status(HttpStatus.CREATED).body(roomId);
    }
}

