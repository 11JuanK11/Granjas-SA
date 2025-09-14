package com.example.granjasa.Entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "reporte")
public class Reporte {
    
    @Id
    private Integer idReporte;
    public Cliente clientes;
    public List<Porcino> porcinos;
}
