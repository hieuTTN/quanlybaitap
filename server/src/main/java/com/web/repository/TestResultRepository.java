package com.web.repository;

import com.web.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TestResultRepository extends JpaRepository<TestResult, Long> {

    @Query("SELECT tr FROM TestResult tr WHERE tr.user.id = ?1 AND tr.testCase.assignment.id = ?2")
    List<TestResult> findByUserIdAndAssignmentId(Long userId, Long assignmentId);
}
