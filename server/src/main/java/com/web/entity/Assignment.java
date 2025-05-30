package com.web.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.web.config.SqlTimeDeserializer;
import com.web.enums.Language;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "asignment")
@Getter
@Setter
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String content;

    private LocalDateTime createdDate;

    private LocalDateTime updatedDate;

    private Date dueDate;

    @JsonFormat(pattern = "HH:mm")
    @JsonDeserialize(using = SqlTimeDeserializer.class)
    private Time duaTime;

    private Language language;

    private String file;

    @ManyToOne
    private Subject subject;

    @OneToMany(mappedBy = "assignment", cascade = CascadeType.REMOVE)
    @JsonBackReference
    private List<TestCase> testCases = new ArrayList<>();

    @Transient
    private Integer numTestCase = 0;

    @Transient
    private Integer totalScore = 0;

    public Integer getNumTestCase() {
        return testCases.size();
    }

    public Integer getTotalScore() {
        for(TestCase t : testCases){
            this.totalScore += t.getScore();
        }
        return totalScore;
    }
}
