package com.web.dto.response;

import com.web.entity.Assignment;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class AssignmentResponse {

    private Date dueDate;

    private List<Assignment> assignments = new ArrayList<>();
}
