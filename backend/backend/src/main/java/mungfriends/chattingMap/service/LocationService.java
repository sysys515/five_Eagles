package mungfriends.chattingMap.service;

import io.micrometer.common.util.StringUtils;
import mungfriends.chattingMap.common.exception.ResourceNotFoundException;
import mungfriends.chattingMap.dto.request.location.LocationAllDto;
import mungfriends.chattingMap.dto.request.location.LocationDto;
import mungfriends.chattingMap.dto.request.location.LocationRequestDto;
import mungfriends.chattingMap.entity.Member;
import mungfriends.chattingMap.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final MemberRepository memberRepository;

    @Transactional
    public void update(Member loginUser, LocationDto locationDto) {
        Member member = memberRepository.findByEmail(loginUser.getEmail()).orElseThrow(
                () -> new ResourceNotFoundException("Member", "Member Email", loginUser.getEmail()));

        member.updateLocation(locationDto.getLongitude(), locationDto.getLatitude());
    }

    public LocationAllDto findLocationInfo(Member loginUser, LocationRequestDto locationRequestDto) {
        List<Member> members = memberRepository.findAll();
        Stream<Member> filteredMembers = members.stream()
                .filter(member -> !member.getEmail().equals(loginUser.getEmail()));

        // 필터 적용
        if (StringUtils.isNotBlank(locationRequestDto.getGender())) {
            filteredMembers = filteredMembers.filter(member -> locationRequestDto.getGender().equals(member.getGender()));
        }
        if (StringUtils.isNotBlank(locationRequestDto.getDogBreed())) {
            filteredMembers = filteredMembers.filter(member -> locationRequestDto.getDogBreed().equals(member.getDogBreed()));
        }
        if (locationRequestDto.getAge() != null) {
            filteredMembers = filteredMembers.filter(member -> locationRequestDto.getAge().equals(member.getAge()));
        }

        List<LocationAllDto.LocationInfo> locationInfos = filteredMembers
                .map(member -> new LocationAllDto.LocationInfo(member.getLatitude(), member.getLongitude(), member.getEmail()))
                .collect(Collectors.toList());

        return new LocationAllDto(locationInfos);
    }
}
