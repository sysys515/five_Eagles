package mungfriends.chattingMap.dto.request.member;

import mungfriends.chattingMap.common.Role;
import mungfriends.chattingMap.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

/**
 * -Request-
 * 회원 가입 요청 dto
 */
@Getter
@Setter
@NoArgsConstructor
public class MemberRegisterDto {

    private String email;
    private String password;
    private String passwordCheck;
    private String username;
    private String nickname;
    private Integer age;
    private String gender;
    private String dogBreed;
    private MultipartFile profile;
    private String oneLineIntro;

    @Builder
    public MemberRegisterDto(String email, String password, String passwordCheck, String username, String nickname, Integer age, String gender, String dogBreed, MultipartFile profile, String oneLineIntro) {
        this.email = email;
        this.password = password;
        this.passwordCheck = passwordCheck;
        this.username = username;
        this.nickname = nickname;
        this.age = age;
        this.gender = gender;
        this.dogBreed = dogBreed;
        this.profile = profile;
        this.oneLineIntro = oneLineIntro;
    }

    // DTO -> Entity
    public static Member ofEntity(MemberRegisterDto dto) {
        Member member = Member.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .username(dto.getUsername())
                .roles(Role.USER)
                .nickname(dto.getNickname())
                .age(dto.getAge())
                .gender(dto.getGender())
                .dogBreed(dto.getDogBreed())
                .oneLineIntro(dto.getOneLineIntro())
                .build();
        return member;
    }
}
