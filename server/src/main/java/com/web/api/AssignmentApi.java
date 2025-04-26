package com.web.api;

import com.web.dto.request.BlogRequest;
import com.web.dto.response.AssignmentResponse;
import com.web.dto.response.BlogResponse;
import com.web.entity.Assignment;
import com.web.service.AssignmentService;
import com.web.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignment")
@CrossOrigin
public class AssignmentApi {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping("/teacher/create-update")
    public ResponseEntity<?> save(@RequestBody Assignment assignment){
        Assignment result = assignmentService.saveOrUpdate(assignment);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/teacher/find-by-subject")
    public ResponseEntity<?> findByTeacher(@RequestParam Long subjectId){
        List<AssignmentResponse> result = assignmentService.findBySubject(subjectId);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
