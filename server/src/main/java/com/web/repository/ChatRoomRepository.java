package com.web.repository;

import com.web.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    @Query("select c from ChatRoom c where c.subject.id = ?1")
    List<ChatRoom> findBySubject(Long subjectId);
}
