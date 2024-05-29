package mungfriends.chattingMap.common.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomNotFoundException extends RuntimeException {

    private HttpStatus status;
    private String message;

    public ChatRoomNotFoundException(String message, HttpStatus status) {
        super(message);
        this.message = message;
        this.status = status;
    }

    public ChatRoomNotFoundException(String message) {
        super(message);
        this.message = message;
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
