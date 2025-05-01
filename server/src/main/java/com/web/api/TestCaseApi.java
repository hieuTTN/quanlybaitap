package com.web.api;

import com.web.dto.request.SubmissionDto;
import com.web.entity.Submission;
import com.web.entity.TestCase;
import com.web.service.SubmissionService;
import com.web.service.TestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testcase")
@CrossOrigin
public class TestCaseApi {

    @Autowired
    private TestCaseService testCaseService;

    @PostMapping("/teacher/create")
    public ResponseEntity<?> save(@RequestBody TestCase testCase){
        TestCase result = testCaseService.save(testCase);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/teacher/delete")
    public ResponseEntity<?> delete(@RequestParam("id") Long id){
        testCaseService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/teacher/find-by-assignment")
    public ResponseEntity<?> findByAss(@RequestParam Long assId){
        List<TestCase> result = testCaseService.findByAss(assId);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/teacher/find-by-id")
    public ResponseEntity<?> findById(@RequestParam Long id){
        TestCase result = testCaseService.findById(id);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

}
