package com.web.entity;

import com.web.enums.Language;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "submission_file")
@Getter
@Setter
public class SubmissionFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName; // VD: Main.java, Program.cpp

    @Lob
    @Column(columnDefinition = "TEXT")
    private String code; // Nội dung mã nguồn

    @ManyToOne
    private Submission submission;
}
