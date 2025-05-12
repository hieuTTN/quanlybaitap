package com.web.api;

import com.web.entity.Subject;
import com.web.entity.SubjectStudent;
import com.web.entity.User;
import com.web.service.SubjectService;
import com.web.service.SubjectStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subject-student")
@CrossOrigin
public class SubjectStudentApi {

    @Autowired
    private SubjectStudentService subjectStudentService;

    @GetMapping("/teacher/student-not-join")
    public ResponseEntity<?> studentNotJoin(@RequestParam String param, @RequestParam Long subjectId){
        List<User> result = subjectStudentService.findStudent(subjectId,param);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/teacher/add-student")
    public ResponseEntity<?> addStudent(@RequestParam Long subjectId, @RequestParam Long userId){
        SubjectStudent result = subjectStudentService.addByTeacher(userId, subjectId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/student/send-request")
    public ResponseEntity<?> sendRequest(@RequestParam Long subjectId){
        SubjectStudent result = subjectStudentService.sendRequest(subjectId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/student/my-request")
    public ResponseEntity<?> myRequest(){
        List<SubjectStudent> result = subjectStudentService.myRequest();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/student/cancel-request")
    public ResponseEntity<?> cancel(@RequestParam Long id){
        subjectStudentService.cancelRequest(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/teacher/request")
    public ResponseEntity<?> waitRequest(@RequestParam Long subjectId, Pageable pageable){
        Page<SubjectStudent> result = subjectStudentService.waitRequest(subjectId, pageable);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/teacher/all-student")
    public ResponseEntity<?> allStudent(@RequestParam Long subjectId, Pageable pageable,
                                        @RequestParam(required = false) String search){
        Page<SubjectStudent> result = subjectStudentService.allStudent(subjectId, pageable, search);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/teacher/all-student-list")
    public ResponseEntity<?> allStudent(@RequestParam Long subjectId, @RequestParam Long assId, @RequestParam(required = false) String search){
        List<SubjectStudent> result = subjectStudentService.allStudent(subjectId, search, assId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/student/all-student")
    public ResponseEntity<?> allStudentByStudent(@RequestParam Long subjectId, Pageable pageable, @RequestParam(required = false) String search){
        Page<SubjectStudent> result = subjectStudentService.allStudent(subjectId, pageable, search);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/teacher/delete")
    public ResponseEntity<?> delete(@RequestParam Long id){
        subjectStudentService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/teacher/accept")
    public ResponseEntity<?> accept(@RequestParam Long id){
        SubjectStudent result = subjectStudentService.accept(id);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
