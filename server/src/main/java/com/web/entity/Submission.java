package com.web.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "submission")
@Getter
@Setter
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Timestamp submitTime;

    private String commitName;

    @ManyToOne
    private Assignment assignment;

    @ManyToOne
    private User student;

    @OneToMany(mappedBy = "submission", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<SubmissionFile> submissionFiles;
}
