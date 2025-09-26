package com.example.granjasa.Dto;

import lombok.Data;

@Data
public class PorcinoInput {
    private String id;
    private String raza;
    private Integer edad;
    private Integer peso;
    private Integer clienteCedula;       
    private AlimentacionInput alimentacion; 
}
