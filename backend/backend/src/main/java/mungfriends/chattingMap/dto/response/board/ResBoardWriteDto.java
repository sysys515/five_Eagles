package mungfriends.chattingMap.dto.response.board;

import mungfriends.chattingMap.entity.Board;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * -Response-
 * 게시글 등록 반환 정보
 */

@Getter
@Setter
@NoArgsConstructor
public class ResBoardWriteDto {

    private Long boardId;
    private String title;
    private String content;
    private String writerName;
    private String createdDate;
    private String boardType;

    @Builder
    public ResBoardWriteDto(Long boardId, String title, String content, String writerName, String createdDate, String boardType) {
        this.boardId = boardId;
        this.title = title;
        this.content = content;
        this.writerName = writerName;
        this.createdDate = createdDate;
        this.boardType = boardType;
    }

    public static ResBoardWriteDto fromEntity(Board board, String writerName) {
        return ResBoardWriteDto.builder()
                .boardId(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .writerName(writerName)
                .createdDate(board.getCreatedDate())
                .boardType(board.getBoardType())
                .build();
    }
}
