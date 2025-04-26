package com.web.repository;

import com.web.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

    @Query("select s from Subject s where s.code = ?1")
    Optional<Subject> findByCode(String code);

    @Query("select s from Subject s where s.code = ?1 and s.id <> ?2")
    Optional<Subject> findByCodeAndId(String code, Long id);

    @Query("select s from Subject s where s.teacher.id = ?1")
    List<Subject> findByTeacher(Long id);

    @Query("select s.subject from SubjectStudent s where s.user.id = ?1 and s.accepted = true")
    List<Subject> findByStudent(Long id);

    @Query("select s from Subject s where s.code = ?1")
    List<Subject> findByCodeStd(String code);
}
