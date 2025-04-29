package com.web.api;

import com.web.entity.ChatRoom;
import com.web.entity.Chatting;
import com.web.repository.ChatRepository;
import com.web.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/chat-room")
@CrossOrigin
public class ChatRoomApi {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @GetMapping("/all/chat-by-subject")
    public ResponseEntity<?> myChat(@RequestParam Long subjectId){
        List<ChatRoom> result = chatRoomRepository.findBySubject(subjectId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/all/chat-by-subject-page")
    public ResponseEntity<?> myChat(@RequestParam Long subjectId, Pageable pageable){
        Page<ChatRoom> result = chatRoomRepository.findBySubject(subjectId, pageable);
        List<ChatRoom> sortedList = new ArrayList<>(result.getContent());
        sortedList.sort(Comparator.comparingLong(ChatRoom::getId));
        Page<ChatRoom> sortedPage = new PageImpl<>(sortedList, pageable, result.getTotalElements());
        return new ResponseEntity<>(sortedPage, HttpStatus.OK);
    }
}
