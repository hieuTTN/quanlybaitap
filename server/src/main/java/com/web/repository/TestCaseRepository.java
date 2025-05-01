package com.web.repository;

import com.web.entity.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TestCaseRepository extends JpaRepository<TestCase, Long> {

    @Query("select t from TestCase t where t.assignment.id = ?1")
    List<TestCase> findByAssignment(Long assId);
}
