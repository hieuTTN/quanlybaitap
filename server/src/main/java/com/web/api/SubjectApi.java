package com.web.api;

import com.web.dto.request.BlogRequest;
import com.web.dto.response.BlogResponse;
import com.web.entity.Subject;
import com.web.service.BlogService;
import com.web.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subject")
@CrossOrigin
public class SubjectApi {

    @Autowired
    private SubjectService subjectService;

    @PostMapping("/teacher/create-update")
    public ResponseEntity<?> save(@RequestBody Subject subject){
        Subject result = subjectService.save(subject);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/teacher/delete")
    public ResponseEntity<?> delete(@RequestParam("id") Long id){
        subjectService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/teacher/my-subject")
    public ResponseEntity<?> mySubjectTeacher(){
        List<Subject> result = subjectService.findAllByTeacher();
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/all/findById")
    public ResponseEntity<?> findById(@RequestParam("id") Long id){
        Subject result = subjectService.findById(id);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @PostMapping("/teacher/lock-unlock")
    public ResponseEntity<?> lockOrUnlock(@RequestParam("id") Long id){
        Subject result = subjectService.lockOrUnlock(id);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

}
