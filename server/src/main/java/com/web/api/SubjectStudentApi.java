package com.web.api;

import com.web.entity.Subject;
import com.web.entity.SubjectStudent;
import com.web.entity.User;
import com.web.service.SubjectService;
import com.web.service.SubjectStudentService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
