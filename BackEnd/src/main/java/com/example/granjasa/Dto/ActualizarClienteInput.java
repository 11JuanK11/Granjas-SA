package com.example.granjasa.Dto;

import lombok.Data;

@Data
public class ActualizarClienteInput {
    private Integer cedula;     
    private String nombres;     
    private String apellidos;   
    private String direccion;   
    private String telefono;    
}
