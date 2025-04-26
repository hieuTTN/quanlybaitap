package com.web.service;

import com.web.entity.Category;
import com.web.entity.Subject;
import com.web.entity.SubjectStudent;
import com.web.entity.User;
import com.web.exception.MessageException;
import com.web.repository.CategoryRepository;
import com.web.repository.SubjectRepository;
import com.web.repository.SubjectStudentRepository;
import com.web.repository.UserRepository;
import com.web.utils.MailService;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class SubjectStudentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubjectStudentRepository subjectStudentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserUtils userUtils;

    @Autowired
    private MailService mailService;

    @Autowired
    private NotificationService notificationService;

    public List<User> findStudent(Long subjectId,String param) {
        if(param.equals("")){
            return new ArrayList<User>();
        }
        param = "%"+param+"%";
        List<User> list = userRepository.userNotJoin(subjectId,param);
        return list;
    }

    public SubjectStudent addByTeacher(Long userId, Long subjectId){
        Optional<SubjectStudent> check = subjectStudentRepository.findBySubjectAndUser(subjectId, userId);
        if(check.isPresent()){
            throw new MessageException("Sinh viên này đã có trong lớp");
        }
        Optional<SubjectStudent> checkNotAcc = subjectStudentRepository.findBySubjectAndUserNotAccept(subjectId, userId);
        if(check.isPresent()){
            checkNotAcc.get().setAccepted(true);
            subjectStudentRepository.save(checkNotAcc.get());
            return checkNotAcc.get();
        }
        SubjectStudent subjectStudent = new SubjectStudent();
        Subject s = subjectRepository.findById(subjectId).get();
        User u = userRepository.findById(userId).get();
        subjectStudent.setAccepted(true);
        subjectStudent.setUser(u);
        subjectStudent.setJoinDate(LocalDateTime.now());
        subjectStudent.setSubject(s);
        subjectStudentRepository.save(subjectStudent);
        mailService.sendEmail(u.getEmail(),"Bạn đã đươc thêm vào môn "+s.getName(),
                "Bạn đã được thêm vào môn học "+s.getName()+" vào lúc: "+subjectStudent.getJoinDate()+"<br>"+
                        "Người thêm: Giảng viên "+s.getTeacher().getFullname()
                , false, true);
        return subjectStudent;
    }

    public SubjectStudent sendRequest(Long subjectId) {
        User u = userUtils.getUserWithAuthority();
        Optional<SubjectStudent> checkSend = subjectStudentRepository.findBySubjectAndUserNotAccept(subjectId, u.getId());
        if(checkSend.isPresent()){
            throw new MessageException("Bạn đã gửi yêu cầu, hãy chờ giảng viên đồng ý");
        }
        Optional<SubjectStudent> checkSends = subjectStudentRepository.findBySubjectAndUser(subjectId, u.getId());
        if(checkSends.isPresent()){
            throw new MessageException("Bạn đã tham gia vào môn này");
        }
        Subject subject = subjectRepository.findById(subjectId).get();
        SubjectStudent s = new SubjectStudent();
        s.setSubject(subject);
        s.setAccepted(false);
        s.setUser(u);
        subjectStudentRepository.save(s);
        notificationService.saveSingle("Có yêu cầu tham gia môn học","",
                "Sinh viên "+u.getFullname()+" yêu cầu tham gia môn học "+subject.getName()+" vào lúc "+LocalDateTime.now().toString(),
                subject.getTeacher().getId());
        mailService.sendEmail(subject.getTeacher().getEmail(),"Có yêu cầu tham gia môn học","Sinh viên "+u.getFullname()+" yêu cầu tham gia môn học "+subject.getName()+" vào lúc "+LocalDateTime.now().toString(),
                false, true);
        return s;
    }

    public List<SubjectStudent> myRequest(){
        List<SubjectStudent> list = subjectStudentRepository.myRequest(userUtils.getUserWithAuthority().getId());
        return list;
    }

    public void cancelRequest(Long id){
        subjectStudentRepository.deleteById(id);
    }
}
