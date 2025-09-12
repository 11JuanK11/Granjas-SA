package com.example.granjasa.Entity;

import java.io.Serializable;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "alimentacion")
public class Alimentacion implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "La descripción es obligatoria")
    @Column(nullable = false)
    private String descripcion;

    @NotNull(message = "La dosis es requerida")
    @Column(nullable = false)
    private String dosis;

}
