package com.web.repository;

import com.web.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    @Query("select s from Submission s where s.assignment.id = ?1 and s.student.id = ?2 order by s.id desc ")
    List<Submission> findByAssignmentAndUser(Long assId, Long userId);
}
