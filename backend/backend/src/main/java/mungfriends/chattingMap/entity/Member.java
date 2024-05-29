package mungfriends.chattingMap.entity;

import jakarta.persistence.*;
import mungfriends.chattingMap.common.BaseTimeEntity;
import mungfriends.chattingMap.common.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
@Entity
@Getter
@NoArgsConstructor
public class Member extends BaseTimeEntity implements UserDetails {

    @Id @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String username;

    @Column
    private String nickname;

    @Column
    private Integer age;

    @Column
    private String gender;

    @Column
    private String dogBreed;

    @Column
    private String profileImage;

    @Column
    private String oneLineIntro;

    @Column
    private Double latitude; // 위도 정보

    @Column
    private Double longitude; // 경도 정보

    @Enumerated(EnumType.STRING)
    private Role roles;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Comment> comments = new ArrayList<>();

    @ManyToMany(mappedBy = "members")
    private List<ChatRoom> chatRooms = new ArrayList<>();

    //== 생성자 Builder ==//
    @Builder
    public Member(String email, String password, String username, String nickname, Integer age, String gender, String dogBreed, String profileImage, String oneLineIntro, Role roles, Double longitude, Double latitude) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.nickname = nickname;
        this.age = age;
        this.gender = gender;
        this.dogBreed = dogBreed;
        this.profileImage = profileImage;
        this.oneLineIntro = oneLineIntro;
        this.roles = roles;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    //== update ==//
    public void update(String password, String username, String nickname, Integer age, String gender, String dogBreed, String oneLineIntro) {
        this.password = password;
        this.username = username;
        this.nickname = nickname;
        this.age = age;
        this.gender = gender;
        this.dogBreed = dogBreed;
        this.oneLineIntro = oneLineIntro;
    }

    public void updateLocation(Double longitude, Double latitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public void updateProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    //========== UserDetails implements ==========//
    @Override
    public String getUsername() {
        return email;
    }

    public String getOriginUsername() {
        return username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add( new SimpleGrantedAuthority("ROLE_" + this.roles.name()));
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
