package com.web.entity;

import com.web.enums.Language;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

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

    private Date createdDate;

    private Date dueDate;

    private Language language;

    private String file;

    @ManyToOne
    private Subject subject;

}
