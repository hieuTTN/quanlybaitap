package com.web.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SubmissionDto {

    private String commitName;

    private Long assignmentId;

    private List<String> files = new ArrayList<>();
}
