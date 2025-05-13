package com.web.service;

import com.web.dto.request.BlogRequest;
import com.web.dto.response.AssignmentResponse;
import com.web.dto.response.BlogResponse;
import com.web.entity.Assignment;
import com.web.entity.Blog;
import com.web.repository.AssignmentRepository;
import com.web.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment saveOrUpdate(Assignment assignment) {
        if(assignment.getId() == null){
            assignment.setCreatedDate(LocalDateTime.now());
        }
        else{
            Assignment ex = assignmentRepository.findById(assignment.getId()).get();
            assignment.setCreatedDate(ex.getCreatedDate());
            assignment.setUpdatedDate(LocalDateTime.now());
        }
        assignmentRepository.save(assignment);
        return assignment;
    }

    public List<AssignmentResponse> findBySubject(Long subjectId){
        List<Date> dates = assignmentRepository.findDateBySubject(subjectId);
        List<AssignmentResponse> result = new ArrayList<>();
        for(Date d : dates){
            AssignmentResponse a = new AssignmentResponse();
            a.setDueDate(d);
            result.add(a);
        }
        List<Assignment> assignments = assignmentRepository.findBySubject(subjectId);
        for(AssignmentResponse r : result){
            for(Assignment a : assignments){
                if(a.getDueDate().equals(r.getDueDate())){
                    r.getAssignments().add(a);
                }
            }
        }
        return result;
    }

    public List<AssignmentResponse> findBySubjectAndFile(Long subjectId){
        List<LocalDateTime> localDateTimes = assignmentRepository.findDateBySubjectAndFile(subjectId);
        List<Date> dates = localDateTimes.stream()
                .map(ldt -> java.sql.Date.valueOf(ldt.toLocalDate()))
                .collect(Collectors.toList());

        List<AssignmentResponse> result = new ArrayList<>();
        for(Date d : dates){
            AssignmentResponse a = new AssignmentResponse();
            a.setDueDate(d);
            result.add(a);
        }
        List<Assignment> assignments = assignmentRepository.findBySubjectAndFile(subjectId);
        for(AssignmentResponse r : result){
            for(Assignment a : assignments){
                if(Date.valueOf(a.getCreatedDate().toLocalDate()).equals(r.getDueDate())){
                    r.getAssignments().add(a);
                }
            }
        }
        return result;
    }
}
