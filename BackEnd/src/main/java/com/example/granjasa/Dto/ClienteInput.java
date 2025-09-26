package com.example.granjasa.Dto;

import lombok.Data;

@Data
public class ClienteInput {
    private Integer cedula;
    private String nombres;
    private String apellidos;
    private String direccion;
    private String telefono;
}
