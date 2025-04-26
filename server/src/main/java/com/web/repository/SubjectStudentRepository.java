package com.web.repository;

import com.web.entity.Subject;
import com.web.entity.SubjectStudent;
import com.web.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SubjectStudentRepository extends JpaRepository<SubjectStudent, Long> {

    @Query("select s from SubjectStudent s where s.subject.id = ?1 and s.user.id = ?2 and s.accepted = true")
    Optional<SubjectStudent> findBySubjectAndUser(Long subjectId, Long userId);

    @Query("select s from SubjectStudent s where s.subject.id = ?1 and s.user.id = ?2 and s.accepted = false")
    Optional<SubjectStudent> findBySubjectAndUserNotAccept(Long subjectId, Long userId);

    @Query("select s from SubjectStudent s where s.user.id = ?1 and s.accepted = false ")
    List<SubjectStudent> myRequest(Long userId);

    @Query("select s from SubjectStudent s where s.subject.id = ?1 and s.accepted = false ")
    Page<SubjectStudent> requestBySubject(Long subjectId, Pageable pageable);

    @Query("select s from SubjectStudent s where s.subject.id = ?1 and s.accepted = true and (s.user.fullname like ?2 or s.user.email like ?2)")
    Page<SubjectStudent> allStudent(Long subjectId,String search, Pageable pageable);
}
