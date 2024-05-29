package mungfriends.chattingMap.service;

import mungfriends.chattingMap.common.exception.MemberException;
import mungfriends.chattingMap.common.exception.ResourceNotFoundException;
import mungfriends.chattingMap.entity.Member;
import mungfriends.chattingMap.repository.MemberRepository;
import mungfriends.chattingMap.dto.request.member.MemberLoginDto;
import mungfriends.chattingMap.dto.request.member.MemberRegisterDto;
import mungfriends.chattingMap.dto.request.member.MemberUpdateDto;
import mungfriends.chattingMap.dto.response.member.MemberResponseDto;
import mungfriends.chattingMap.dto.response.member.MemberTokenDto;
import mungfriends.chattingMap.config.security.jwt.CustomUserDetailsService;
import mungfriends.chattingMap.config.security.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberService {

    private final PasswordEncoder encoder;
    private final MemberRepository memberRepository;

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final FileService fileService;

    public HttpStatus checkIdDuplicate(String email) {
        isExistUserEmail(email);
        return HttpStatus.OK;
    }

    public MemberResponseDto register(MemberRegisterDto registerDto) {
        isExistUserEmail(registerDto.getEmail());
        checkPassword(registerDto.getPassword(), registerDto.getPasswordCheck());


        // 패스워드 암호화
        String encodePwd = encoder.encode(registerDto.getPassword());
        registerDto.setPassword(encodePwd);
        Member member = MemberRegisterDto.ofEntity(registerDto);

        updateMemberProfile(registerDto.getProfile(), member);

        Member saveMember = memberRepository.save(member);

        return MemberResponseDto.fromEntity(saveMember);
    }

    private void updateMemberProfile(MultipartFile multipartFile, Member member) {
        try {
            member.updateProfileImage(fileService.uploadProfileImage(multipartFile));
        } catch (IOException e) {
            throw new IllegalStateException("파일 저장에 실패하였습니다.");
        }
    }


    public MemberTokenDto login(MemberLoginDto loginDto) {
        authenticate(loginDto.getEmail(), loginDto.getPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginDto.getEmail());
        checkEncodePassword(loginDto.getPassword(), userDetails.getPassword());
        String token = jwtTokenUtil.generateToken(userDetails);
        return MemberTokenDto.fromEntity(userDetails, token);
    }

    public MemberResponseDto check(Member member, String password) {
        Member checkMember = (Member) userDetailsService.loadUserByUsername(member.getEmail());
        checkEncodePassword(password, checkMember.getPassword());
        return MemberResponseDto.fromEntity(checkMember);
    }

    public MemberResponseDto update(Member member, MemberUpdateDto updateDto) {
        checkPassword(updateDto.getPassword(), updateDto.getPasswordCheck());
        String encodePwd = encoder.encode(updateDto.getPassword());
        Member updateMember =  memberRepository.findByEmail(member.getEmail()).orElseThrow(
                () -> new ResourceNotFoundException("Member", "Member Email", member.getEmail())
        );
        updateMember.update(encodePwd, updateDto.getUsername(), updateDto.getNickname(), updateDto.getAge(), updateDto.getGender(), updateDto.getDogBreed(), updateDto.getOneLineIntro());

        if(!ObjectUtils.isEmpty(updateDto.getProfile())) {
            updateMemberProfile(updateDto.getProfile(), updateMember);
        }

        return MemberResponseDto.fromEntity(updateMember);
    }

    public MemberResponseDto myInfo(Member member) {
        return MemberResponseDto.fromEntity(member);
    }

    @Transactional(readOnly = true)
    public MemberResponseDto findByEmail(String userId) {
        Member member = memberRepository.findByEmail(userId).orElseThrow(
                () -> new ResourceNotFoundException("Member", "Member email", String.valueOf(userId)));

        return MemberResponseDto.fromEntity(member);
    }

    /**
     * 사용자 인증
     * @param email
     * @param pwd
     */
    private void authenticate(String email, String pwd) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, pwd));
        } catch (DisabledException e) {
            throw new MemberException("인증되지 않은 아이디입니다.", HttpStatus.BAD_REQUEST);
        } catch (BadCredentialsException e) {
            throw new MemberException("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 아이디(이메일) 중복 체크
     * @param email
     */
    private void isExistUserEmail(String email) {
        if (memberRepository.findByEmail(email).isPresent()) {
            throw new MemberException("이미 사용 중인 이메일입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 비밀번호와 비밀번호 확인이 같은지 체크
     * @param password
     * @param passwordCheck
     */
    private void checkPassword(String password, String passwordCheck) {
        if (!password.equals(passwordCheck)) {
            throw new MemberException("패스워드 불일치", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 사용자가 입력한 비번과 DB에 저장된 비번이 같은지 체크 : 인코딩 확인
     * @param rawPassword
     * @param encodedPassword
     */
    private void checkEncodePassword(String rawPassword, String encodedPassword) {
        if (!encoder.matches(rawPassword, encodedPassword)) {
            throw new MemberException("패스워드 불일치", HttpStatus.BAD_REQUEST);
        }
    }
}
