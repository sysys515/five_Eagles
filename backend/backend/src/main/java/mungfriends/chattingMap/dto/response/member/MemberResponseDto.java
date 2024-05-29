package mungfriends.chattingMap.dto.response.member;

import mungfriends.chattingMap.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * -Response-
 * 사용자 정보 반환 Dto
 */

@Getter
@Setter
@NoArgsConstructor
public class MemberResponseDto {
    private Long id;
    private String email;
    private String username;
    private String nickname;
    private Integer age;
    private String gender;
    private String dogBreed;
    private String oneLineIntro;
    private String profileImage;

    @Builder
    public MemberResponseDto(Long id, String email, String username, String nickname, Integer age, String gender, String dogBreed, String oneLineIntro, String profileImage) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.nickname = nickname;
        this.age = age;
        this.gender = gender;
        this.dogBreed = dogBreed;
        this.oneLineIntro = oneLineIntro;
        this.profileImage = profileImage;
    }

    // Entity -> DTO
    public static MemberResponseDto fromEntity(Member member) {
        return MemberResponseDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .username(member.getOriginUsername())
                .nickname(member.getNickname())
                .age(member.getAge())
                .gender(member.getGender())
                .dogBreed(member.getDogBreed())
                .oneLineIntro(member.getOneLineIntro())
                .profileImage(member.getProfileImage())
                .build();
    }
}
