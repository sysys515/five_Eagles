package mungfriends.chattingMap.dto.request.board;

import mungfriends.chattingMap.entity.Board;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * -Request-
 * 게시글 등록 정보 요청, 작성자는 Authentication 받음
 */

@Getter
@Setter
@NoArgsConstructor
public class BoardWriteDto {

    private String title;
    private String content;
    private String boardType;

    public BoardWriteDto(String title, String content, String boardType) {
        this.title = title;
        this.content = content;
        this.boardType = boardType;
    }

    @Builder
    public static Board ofEntity(BoardWriteDto dto) {
        return Board.builder()
                .title(dto.title)
                .content(dto.content)
                .boardType(dto.getBoardType())
                .build();
    }
}
