package mungfriends.chattingMap.service;

import jakarta.transaction.Transactional;
import mungfriends.chattingMap.entity.Board;
import mungfriends.chattingMap.repository.BoardRepository;
import mungfriends.chattingMap.dto.request.board.BoardUpdateDto;
import mungfriends.chattingMap.dto.request.board.BoardWriteDto;
import mungfriends.chattingMap.dto.request.board.SearchData;
import mungfriends.chattingMap.dto.response.board.ResBoardDetailsDto;
import mungfriends.chattingMap.dto.response.board.ResBoardListDto;
import mungfriends.chattingMap.dto.response.board.ResBoardWriteDto;
import mungfriends.chattingMap.common.exception.ResourceNotFoundException;
import mungfriends.chattingMap.entity.Member;
import mungfriends.chattingMap.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    // 페이징 리스트
    public Page<ResBoardListDto> getAllBoards(Pageable pageable) {
        Page<Board> boards = boardRepository.findAllWithMemberAndComments(pageable);
        List<ResBoardListDto> list = boards.getContent().stream()
                .map(ResBoardListDto::fromEntity)
                .collect(Collectors.toList());
        return new PageImpl<>(list, pageable, boards.getTotalElements());
    }

    // 게시글 검색, isEmpty() == ""
    public Page<ResBoardListDto> search(SearchData searchData, Pageable pageable) {
        Page<Board> result = null;
        if (!searchData.getTitle().isEmpty()) {
            result = boardRepository.findAllTitleContaining(searchData.getTitle(), pageable);
        } else if (!searchData.getContent().isEmpty()) {
            result = boardRepository.findAllContentContaining(searchData.getContent(), pageable);
        } else if (!searchData.getWriterName().isEmpty()) {
            result = boardRepository.findAllUsernameContaining(searchData.getWriterName(), pageable);
        }
        List<ResBoardListDto> list = result.getContent().stream()
                .map(ResBoardListDto::fromEntity)
                .collect(Collectors.toList());
        return new PageImpl<>(list, pageable, result.getTotalElements());
    }

    // 게시글 등록
    public ResBoardWriteDto write(BoardWriteDto boardDTO, Member member) {

        Board board = BoardWriteDto.ofEntity(boardDTO);
        Member writerMember = memberRepository.findByEmail(member.getEmail()).orElseThrow(
                () -> new ResourceNotFoundException("Member", "Member Email", member.getEmail())
        );
        board.setMappingMember(writerMember);
        Board saveBoard = boardRepository.save(board);
        return ResBoardWriteDto.fromEntity(saveBoard, writerMember.getNickname());
    }

    // 게시글 상세보기
    public ResBoardDetailsDto detail(Long boardId) {
       Board findBoard = boardRepository.findByIdWithMemberAndCommentsAndFiles(boardId).orElseThrow(
               () -> new ResourceNotFoundException("Board", "Board Id", String.valueOf(boardId))
       );
       // 조회수 증가
       findBoard.upViewCount();
       return ResBoardDetailsDto.fromEntity(findBoard);
    }

    // 게시글 수정
    public ResBoardDetailsDto update(Long boardId, BoardUpdateDto boardDTO) {
        Board updateBoard = boardRepository.findByIdWithMemberAndCommentsAndFiles(boardId).orElseThrow(
                () -> new ResourceNotFoundException("Board", "Board Id", String.valueOf(boardId))
        );
        updateBoard.update(boardDTO.getTitle(), boardDTO.getContent());
        return ResBoardDetailsDto.fromEntity(updateBoard);
    }

    // 게시글 삭제
    public void delete(Long boardId) {
        boardRepository.deleteById(boardId);
    }
}
