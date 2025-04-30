package com.web.api;

import com.web.dto.request.SubmissionDto;
import com.web.entity.Subject;
import com.web.entity.Submission;
import com.web.service.SubjectService;
import com.web.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submission")
@CrossOrigin
public class SubmissionApi {

    @Autowired
    private SubmissionService submissionService;

    @PostMapping("/student/create")
    public ResponseEntity<?> save(@RequestBody SubmissionDto dto){
        Submission result = submissionService.save(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/student/delete")
    public ResponseEntity<?> delete(@RequestParam("id") Long id){
        submissionService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/student/delete-file")
    public ResponseEntity<?> deleteFile(@RequestParam("id") Long id){
        submissionService.deleteFile(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/student/my-submission")
    public ResponseEntity<?> mySubjectTeacher(@RequestParam Long assId){
        List<Submission> result = submissionService.findByAss(assId);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

}
