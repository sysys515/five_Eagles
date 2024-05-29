package mungfriends.chattingMap.repository;

import mungfriends.chattingMap.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

}
