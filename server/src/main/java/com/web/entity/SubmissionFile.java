package com.web.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    private String link;

    @ManyToOne
    @JsonBackReference
    private Submission submission;
}
