package com.web.repository;

import com.web.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    @Query("select distinct a.dueDate from Assignment a where a.subject.id = ?1 order by a.dueDate asc")
    List<Date> findDateBySubject(Long subjectId);

    @Query("select a from Assignment a where a.subject.id = ?1")
    List<Assignment> findBySubject(Long subjectId);
}
