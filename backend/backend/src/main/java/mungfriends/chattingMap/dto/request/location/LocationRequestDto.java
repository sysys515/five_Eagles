package mungfriends.chattingMap.dto.request.location;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationRequestDto {
    private String gender;
    private String dogBreed;
    private Integer age;
}
