package com.web.repository;

import com.web.dto.response.ResultResponse;
import com.web.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TestResultRepository extends JpaRepository<TestResult, Long> {

    @Query("SELECT tr FROM TestResult tr WHERE tr.user.id = ?1 AND tr.testCase.assignment.id = ?2")
    List<TestResult> findByUserIdAndAssignmentId(Long userId, Long assignmentId);

    @Query("SELECT sum(tr.earnedScore) FROM TestResult tr WHERE tr.user.id = ?1 AND tr.testCase.assignment.id = ?2")
    Integer totalScore(Long userId, Long assignmentId);

    @Query("SELECT new com.web.dto.response.ResultResponse(u.id, u.fullname, u.code, " +
            "(SELECT COALESCE(SUM(tr.earnedScore), 0) " +
            " FROM TestResult tr INNER JOIN tr.testCase tc " +
            " WHERE tr.user.id = u.id AND tc.assignment.id = :assId)) " +
            "FROM SubjectStudent s INNER JOIN s.user u " +
            "WHERE s.subject.id = :subjectId")
    List<ResultResponse> findByAssIdAndSubjectId(@Param("assId") Long assId,
                                                 @Param("subjectId") Long subjectId);
}
