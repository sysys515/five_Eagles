package mungfriends.chattingMap.dto.response.board;

import mungfriends.chattingMap.entity.Board;
import mungfriends.chattingMap.dto.response.comment.ResCommentDto;
import mungfriends.chattingMap.dto.response.file.ResBoardDetailsFileDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

/**
 * -Response-
 * 게시글 상세, 수정 요청에 대한 정보를 반환
 */

@Getter
@Setter
@NoArgsConstructor
public class ResBoardDetailsDto {

    // board info
    private Long boardId;
    private String title;
    private String content;
    private int viewCount;
    private String writerName;
    private String createdDate;
    private String modifiedDate;
    private String boardType;
    private Long createMemberId;

    // comments
    private List<ResCommentDto> comments;

    // file
    private List<ResBoardDetailsFileDto> files;

    @Builder
    public ResBoardDetailsDto(Long boardId, String title, String content, int viewCount, String writerName, String createdDate, String modifiedDate, Long createMemberId, List<ResCommentDto> comments, List<ResBoardDetailsFileDto> files, String boardType) {
        this.boardId = boardId;
        this.title = title;
        this.content = content;
        this.viewCount = viewCount;
        this.writerName = writerName;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.comments = comments;
        this.files = files;
        this.boardType = boardType;
        this.createMemberId = createMemberId;
    }

    public static ResBoardDetailsDto fromEntity(Board board) {
        return ResBoardDetailsDto.builder()
                .boardId(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .viewCount(board.getViewCount())
                .writerName(board.getMember().getNickname())
                .createdDate(board.getCreatedDate())
                .modifiedDate(board.getModifiedDate())
                .comments(board.getComments().stream()
                        .map(ResCommentDto::fromEntity)
                        .collect(Collectors.toList()))
                .files(board.getFiles().stream()
                        .map(ResBoardDetailsFileDto::fromEntity)
                        .collect(Collectors.toList()))
                .boardType(board.getBoardType())
                .createMemberId(board.getMember().getId())
                .build();
    }
}
