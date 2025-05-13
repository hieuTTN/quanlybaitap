package com.web.repository;

import com.web.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    @Query("select distinct a.dueDate from Assignment a where a.subject.id = ?1 order by a.dueDate asc")
    List<Date> findDateBySubject(Long subjectId);

    @Query("select a from Assignment a where a.subject.id = ?1")
    List<Assignment> findBySubject(Long subjectId);


    @Query("select distinct a.createdDate from Assignment a where a.subject.id = ?1 and a.file is not null and a.file <> '' order by a.createdDate asc")
    List<LocalDateTime> findDateBySubjectAndFile(Long subjectId);

    @Query("select a from Assignment a where a.subject.id = ?1 and a.file is not null and a.file <> ''")
    List<Assignment> findBySubjectAndFile(Long subjectId);


}
