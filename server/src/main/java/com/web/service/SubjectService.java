package com.web.service;

import com.web.dto.response.CategoryDto;
import com.web.entity.Category;
import com.web.entity.Subject;
import com.web.entity.User;
import com.web.exception.MessageException;
import com.web.repository.CategoryRepository;
import com.web.repository.SubjectRepository;
import com.web.repository.SubjectStudentRepository;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.List;

@Component
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private SubjectStudentRepository subjectStudentRepository;

    @Autowired
    private UserUtils userUtils;

    public Subject save(Subject subject) {
        if(subject.getId() == null){
            if(subjectRepository.findByCode(subject.getCode()).isPresent()){
                throw new MessageException("Mã môn học/ lớp đã tồn tại");
            }
            subject.setCreatedDate(new Date(System.currentTimeMillis()));
        }
        else{
            if(subjectRepository.findByCodeAndId(subject.getCode(), subject.getId()).isPresent()){
                throw new MessageException("Mã môn học/ lớp đã tồn tại");
            }
            Subject s = subjectRepository.findById(subject.getId()).get();
            subject.setCreatedDate(s.getCreatedDate());
            subject.setUpdatedDate(new Date(System.currentTimeMillis()));
        }
        subject.setTeacher(userUtils.getUserWithAuthority());
        subjectRepository.save(subject);
        return subject;
    }

    public void delete(Long categoryId) {
        subjectRepository.deleteById(categoryId);
    }

    public Subject findById(Long id) {
        return subjectRepository.findById(id).get();
    }

    public List<Subject> findAllByTeacher() {
        List<Subject> result = subjectRepository.findByTeacher(userUtils.getUserWithAuthority().getId());
        return result;
    }

    public List<Subject> findAllByStudent() {
        List<Subject> result = subjectRepository.findByStudent(userUtils.getUserWithAuthority().getId());
        return result;
    }

    public Subject lockOrUnlock(Long id){
        Subject s = subjectRepository.findById(id).get();
        if(s.getLocked() == false){
            s.setLocked(true);
        }
        else{
            s.setLocked(false);
        }
        subjectRepository.save(s);
        return s;
    }

    public List<Subject> subjectNotJoin(String param) {
        List<Subject> list = subjectRepository.findByCodeStd(param);
        User u = userUtils.getUserWithAuthority();
        for(Subject s : list){
            if(subjectStudentRepository.findBySubjectAndUser(s.getId(),u.getId()).isPresent()){
                list.remove(s);
                break;
            }
        }
        return list;
    }
}
