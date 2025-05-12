package com.web.service;
import com.web.dto.response.TestResultResponse;
import com.web.entity.TestCase;
import com.web.entity.TestResult;
import com.web.repository.TestCaseRepository;
import com.web.repository.TestResultRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TestResultService {

    @Autowired
    private TestCaseRepository testCaseRepository;

    @Autowired
    private TestResultRepository testResultRepository;

    public TestResultResponse getTestCaseUser(Long userId, Long assignmentId) {
        List<TestCase> allTestCases = testCaseRepository.findByAssignment(assignmentId);

        List<TestResult> userResults = testResultRepository.findByUserIdAndAssignmentId(userId, assignmentId);

        Set<Long> gradedTestCaseIds = userResults.stream()
                .map(tr -> tr.getTestCase().getId())
                .collect(Collectors.toSet());

        List<TestCase> ungraded = allTestCases.stream()
                .filter(tc -> !gradedTestCaseIds.contains(tc.getId()))
                .collect(Collectors.toList());

        return new TestResultResponse(ungraded, userResults);
    }

    public TestResult save(TestResult testResult){
        testResultRepository.save(testResult);
        return testResult;
    }

    public void delete(Long id){
        testResultRepository.deleteById(id);
    }

}
