package mungfriends.chattingMap.controller;

import mungfriends.chattingMap.dto.request.location.LocationAllDto;
import mungfriends.chattingMap.dto.request.location.LocationDto;
import mungfriends.chattingMap.dto.request.location.LocationRequestDto;
import mungfriends.chattingMap.entity.Member;
import mungfriends.chattingMap.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class LocationController {
    private final LocationService locationService;

    @PostMapping("/location")
    public void updateLocation(@AuthenticationPrincipal Member member, @RequestBody LocationDto locationDto) {
        if(locationDto.isEmpty()) {
            throw new IllegalArgumentException("좌표가 없습니다. 좌표를 허용해주세요.");
        }
        locationService.update(member, locationDto);
        //return "{\"latitude\":37.7749, \"longitude\":-122.4194}";
    }

    @GetMapping("/location")
    public LocationAllDto findLocation(@AuthenticationPrincipal Member member, @ModelAttribute LocationRequestDto locationRequestDto) {
        return locationService.findLocationInfo(member, locationRequestDto);
    }
}
