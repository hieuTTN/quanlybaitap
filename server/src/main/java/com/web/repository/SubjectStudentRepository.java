package com.web.repository;

import com.web.entity.SubjectStudent;
import com.web.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubjectStudentRepository extends JpaRepository<SubjectStudent, Long> {

}
