package com.web.service;

import com.web.entity.Category;
import com.web.entity.User;
import com.web.repository.CategoryRepository;
import com.web.repository.SubjectStudentRepository;
import com.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SubjectStudentService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findStudent(String param) {
        if(param.equals("")){
            return new ArrayList<User>();
        }
        param = "%"+param+"%";
        List<User> list = userRepository.userNotJoin(param);
        return list;
    }
}
