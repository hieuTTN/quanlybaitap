package com.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResultResponse {

    private Long id;

    private String fullname;

    private String code;

    private Long tongDiem;
}
