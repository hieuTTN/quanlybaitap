package com.web.service;

import com.web.dto.response.CategoryDto;
import com.web.entity.Category;
import com.web.entity.Subject;
import com.web.exception.MessageException;
import com.web.repository.CategoryRepository;
import com.web.repository.SubjectRepository;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserUtils userUtils;

    public Subject save(Subject subject) {
        if(subject.getId() == null){
            if(subjectRepository.findByCode(subject.getCode()).isPresent()){
                throw new MessageException("Mã môn học/ lớp đã tồn tại");
            }
        }
        else{
            if(subjectRepository.findByCodeAndId(subject.getCode(), subject.getId()).isPresent()){
                throw new MessageException("Mã môn học/ lớp đã tồn tại");
            }
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

}
