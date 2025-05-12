package com.web.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "subject_student")
@Getter
@Setter
public class SubjectStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean accepted;

    private LocalDateTime joinDate;

    @ManyToOne
    private Subject subject;

    @ManyToOne
    private User user;

    @Transient
    private Integer totalScore = 0;
}
