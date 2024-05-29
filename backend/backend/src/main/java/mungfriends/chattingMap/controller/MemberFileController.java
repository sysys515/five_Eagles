package mungfriends.chattingMap.controller;

import jakarta.servlet.http.HttpServletRequest;
import mungfriends.chattingMap.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberFileController {
    private final FileService fileService;

    @GetMapping("/profile/files/{fileName}")
    public ResponseEntity<Resource> getProfileImage(@PathVariable String fileName, HttpServletRequest request) {
        try {
            // 파일 리소스 로드
            Resource resource = fileService.loadFileAsResource(fileName);

            // 파일의 콘텐츠 타입 결정
            String contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
            if(contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
