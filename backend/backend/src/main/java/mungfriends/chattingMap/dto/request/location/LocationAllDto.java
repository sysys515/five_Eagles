package mungfriends.chattingMap.dto.request.location;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LocationAllDto {
    private List<LocationInfo> locationInfoList;

    @Getter
    @NoArgsConstructor
    public static class LocationInfo extends LocationDto {
        private String userId;

        public LocationInfo(Double latitude, Double longitude, String userId) {
            super(latitude, longitude);
            this.userId = userId;
        }
    }
}
