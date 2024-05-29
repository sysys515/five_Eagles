package mungfriends.chattingMap.service;

import mungfriends.chattingMap.common.exception.ChatRoomNotFoundException;
import mungfriends.chattingMap.common.exception.MemberException;
import mungfriends.chattingMap.dto.request.chat.ChatMessage;
import mungfriends.chattingMap.dto.request.chat.MessageType;
import mungfriends.chattingMap.dto.request.chat.MyChattingRoom;
import mungfriends.chattingMap.dto.request.chat.MyChattingRooms;
import mungfriends.chattingMap.entity.ChatRoom;
import mungfriends.chattingMap.entity.Member;
import mungfriends.chattingMap.entity.Message;
import mungfriends.chattingMap.repository.ChatRoomRepository;
import mungfriends.chattingMap.repository.MemberRepository;
import mungfriends.chattingMap.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
@Transactional
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;
    private final MessageRepository messageRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Transactional
    public ChatRoom createChatRoom(Member member1, Member member2) {
        // 기존 채팅방이 있는지 확인
        Optional<ChatRoom> existingChatRoom = chatRoomRepository.findByMembersContaining(member1).stream()
                .filter(chatRoom -> chatRoom.getMembers().contains(member2))
                .findFirst();

        if (existingChatRoom.isPresent()) {
            return existingChatRoom.get();
        }

        // 기존 채팅방이 없으면 새 채팅방 생성
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setMembers(new ArrayList<>(Arrays.asList(member1, member2)));
        chatRoom.setRoomId(UUID.randomUUID().toString());
        return chatRoomRepository.save(chatRoom);
    }

    @Transactional
    public String createChatRoomByIds(Long member1Id, Long member2Id) {
        Member member1 = memberRepository.findById(member1Id)
                .orElseThrow(() -> new MemberException("회원을 찾을 수 없습니다.", HttpStatus.BAD_REQUEST));
        Member member2 = memberRepository.findById(member2Id)
                .orElseThrow(() -> new MemberException("회원을 찾을 수 없습니다.", HttpStatus.BAD_REQUEST));
        ChatRoom chatRoom = createChatRoom(member1, member2);
        return chatRoom.getRoomId();
    }

    @Transactional
    public void saveMessage(ChatRoom chatRoom, Member member, String content, MessageType type, String senderName) {
        Message message = new Message(chatRoom, member, content, type, senderName);
        messageRepository.save(message);
    }

    @Transactional(readOnly = true)
    public MyChattingRooms findMyRooms(Member member) {
        List<ChatRoom> rooms = chatRoomRepository.findByMembersContaining(member);
        return new MyChattingRooms(rooms.stream()
                .map(chatRoom -> new MyChattingRoom(chatRoom, member))
                .collect(Collectors.toList()));
    }

    @Transactional(readOnly = true)
    public List<ChatMessage> findMessage(String chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(chatRoomId)
                .orElseThrow(() -> new ChatRoomNotFoundException("채팅방을 찾을 수 없습니다."));
        List<Message> messages = messageRepository.findByChatRoom(chatRoom);
        return messages.stream()
                .map(ChatMessage::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void processSendMessage(ChatMessage message) {
        String chatRoomId = message.getRoomId();
        Member sender = memberRepository.findByEmail(message.getSender())
                .orElseThrow(() -> new MemberException("회원을 찾을 수 없습니다.", HttpStatus.BAD_REQUEST));
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(chatRoomId)
                .orElseThrow(() -> new ChatRoomNotFoundException("채팅방을 찾을 수 없습니다."));

        saveMessage(chatRoom, sender, message.getContent(), message.getType(), message.getSenderName());
        simpMessagingTemplate.convertAndSend("/topic/private/" + chatRoomId, message);
    }
}
