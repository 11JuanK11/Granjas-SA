package com.example.granjasa.Dto;

import lombok.Data;

@Data
public class ActualizarPorcinoInput {
    private String id;
    private String raza;    
    private Integer edad;
    private Integer peso;
    private ClienteInput cliente;
    private AlimentacionInput alimentacion;
}
