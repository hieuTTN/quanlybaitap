package com.web.service;

import com.web.dto.request.SubmissionDto;
import com.web.entity.Assignment;
import com.web.entity.Submission;
import com.web.entity.SubmissionFile;
import com.web.repository.AssignmentRepository;
import com.web.repository.SubmissionFileRepository;
import com.web.repository.SubmissionRepository;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;

@Component
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private SubmissionFileRepository submissionFileRepository;

    @Autowired
    private UserUtils userUtils;

    public Submission save(SubmissionDto dto){
        Assignment assignment = assignmentRepository.findById(dto.getAssignmentId()).get();
//        if(assignment.getDueDate().before(new)){
//
//        }
        Submission submission = new Submission();
        submission.setCommitName(dto.getCommitName());
        submission.setAssignment(assignmentRepository.findById(dto.getAssignmentId()).get());
        submission.setSubmitTime(new Timestamp(System.currentTimeMillis()));
        submission.setStudent(userUtils.getUserWithAuthority());
        submissionRepository.save(submission);

        for(String s : dto.getFiles()){
            SubmissionFile submissionFile = new SubmissionFile();
            submissionFile.setSubmission(submission);
            submissionFile.setLink(s);
            submissionFileRepository.save(submissionFile);
        }

        return submission;
    }

    public List<Submission> findByAss(Long assId){
        List<Submission> list = submissionRepository.findByAssignmentAndUser(assId, userUtils.getUserWithAuthority().getId());
        return list;
    }

    public List<Submission> findByAssAndUser(Long assId, Long userId){
        List<Submission> list = submissionRepository.findByAssignmentAndUser(assId, userId);
        return list;
    }

    public void delete(Long id){
        submissionRepository.deleteById(id);
    }

    public void deleteFile(Long id){
        submissionFileRepository.deleteById(id);
    }

    public Submission findById(Long id){
        return submissionRepository.findById(id).get();
    }

    public SubmissionFile findFileById(Long id){
        return submissionFileRepository.findById(id).get();
    }
}
