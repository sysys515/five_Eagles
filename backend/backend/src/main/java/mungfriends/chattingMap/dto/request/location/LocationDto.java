package mungfriends.chattingMap.dto.request.location;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.ObjectUtils;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LocationDto {
    private Double latitude; // 위도 정보
    private Double longitude; // 경도 정보

    public boolean isEmpty() {
        return ObjectUtils.isEmpty(latitude) || ObjectUtils.isEmpty(longitude);
    }
}
