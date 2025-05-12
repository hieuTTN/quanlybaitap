package com.web.dto.response;

import com.web.entity.TestCase;
import com.web.entity.TestResult;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TestResultResponse {

    private List<TestCase> testCases = new ArrayList<>();

    private List<TestResult> testResults = new ArrayList<>();
}
