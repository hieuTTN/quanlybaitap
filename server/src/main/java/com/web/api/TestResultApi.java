package com.web.api;

import com.web.dto.response.TestResultResponse;
import com.web.entity.TestCase;
import com.web.entity.TestResult;
import com.web.service.TestCaseService;
import com.web.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/testresult")
@CrossOrigin
public class TestResultApi {

    @Autowired
    private TestResultService testResultService;

    @GetMapping("/teacher/get-result-student")
    public ResponseEntity<?> save(@RequestParam Long userId, @RequestParam Long assignmentId){
        TestResultResponse result = testResultService.getTestCaseUser(userId, assignmentId);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PostMapping("/teacher/create")
    public ResponseEntity<?> save(@RequestBody TestResult testResult){
        TestResult result = testResultService.save(testResult);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/teacher/delete")
    public ResponseEntity<?> delete(@RequestParam Long id){
        testResultService.delete(id);
        return new ResponseEntity<>("success", HttpStatus.CREATED);
    }
}
