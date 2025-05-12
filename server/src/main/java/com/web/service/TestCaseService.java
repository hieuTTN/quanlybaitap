package com.web.service;

import com.web.entity.Subject;
import com.web.entity.TestCase;
import com.web.entity.User;
import com.web.exception.MessageException;
import com.web.repository.SubmissionRepository;
import com.web.repository.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.List;

@Component
public class TestCaseService {

    @Autowired
    private TestCaseRepository testCaseRepository;

    public TestCase save(TestCase testCase) {
        testCaseRepository.save(testCase);
        return testCase;
    }

    public void delete(Long id) {
        testCaseRepository.deleteById(id);
    }

    public TestCase findById(Long id) {
        return testCaseRepository.findById(id).get();
    }

    public List<TestCase> findByAss(Long assId) {
        List<TestCase> result = testCaseRepository.findByAssignment(assId);
        return result;
    }


}
