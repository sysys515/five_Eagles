package mungfriends.chattingMap.dto.request.member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class MemberUpdateDto {

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
    public MemberUpdateDto(String password, String passwordCheck, String username, String nickname, Integer age, String gender, String dogBreed, MultipartFile profile, String oneLineIntro) {
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
}
