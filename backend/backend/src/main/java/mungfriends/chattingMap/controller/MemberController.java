package mungfriends.chattingMap.controller;

import mungfriends.chattingMap.entity.Member;
import mungfriends.chattingMap.service.MemberService;
import mungfriends.chattingMap.dto.request.member.MemberLoginDto;
import mungfriends.chattingMap.dto.request.member.MemberRegisterDto;
import mungfriends.chattingMap.dto.request.member.MemberUpdateDto;
import mungfriends.chattingMap.dto.response.member.MemberResponseDto;
import mungfriends.chattingMap.dto.response.member.MemberTokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/checkId")
    public ResponseEntity<?> checkIdDuplicate(@RequestParam String email) {
        memberService.checkIdDuplicate(email);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/register")
    public ResponseEntity<MemberResponseDto> register(@ModelAttribute MemberRegisterDto memberRegisterDTO) {
        MemberResponseDto successMember = memberService.register(memberRegisterDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(successMember);
    }

    @PostMapping("/login")
    public ResponseEntity<MemberTokenDto> login(@RequestBody MemberLoginDto memberLoginDTO) {
        MemberTokenDto loginDTO = memberService.login(memberLoginDTO);
        return ResponseEntity.status(HttpStatus.OK).header(loginDTO.getToken()).body(loginDTO);
    }

    @PostMapping("/checkPwd")
    public ResponseEntity<MemberResponseDto> check(
            @AuthenticationPrincipal Member member,
            @RequestBody Map<String, String> request) {
        String password = request.get("password");
        MemberResponseDto memberInfo = memberService.check(member, password);
        return ResponseEntity.status(HttpStatus.OK).body(memberInfo);
    }

    @PutMapping("/update")
    public ResponseEntity<MemberResponseDto> update(
            @AuthenticationPrincipal Member member,
            @ModelAttribute MemberUpdateDto memberUpdateDTO) {
        MemberResponseDto memberUpdate = memberService.update(member, memberUpdateDTO);
        return ResponseEntity.status(HttpStatus.OK).body(memberUpdate);
    }

    @GetMapping("/myInfo")
    public ResponseEntity<MemberResponseDto> getMyInfo(@AuthenticationPrincipal Member member) {
        MemberResponseDto memberResponseDto = memberService.myInfo(member);
        return ResponseEntity.status(HttpStatus.OK).body(memberResponseDto);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<MemberResponseDto> getInfo(@PathVariable String userId) {
        MemberResponseDto memberResponseDto = memberService.findByEmail(userId);
        return ResponseEntity.status(HttpStatus.OK).body(memberResponseDto);
    }
}
