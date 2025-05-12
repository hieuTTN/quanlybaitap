package com.web.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "test_result")
@Getter
@Setter
public class TestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String actualOutput;  // Kết quả sinh viên

    private Boolean passed;       // Đúng hay sai

    private Integer earnedScore;  // Điểm đạt được (0 hoặc điểm test case)

    @ManyToOne
    private TestCase testCase;

    @ManyToOne
    private User user;
}
