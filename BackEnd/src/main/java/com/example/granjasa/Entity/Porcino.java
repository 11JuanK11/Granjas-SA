package com.example.granjasa.Entity;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "porcino")
public class Porcino implements Serializable{

    @Id
    private String id;

    @NotNull(message = "La raza es obligatoria")
    @Column(nullable = false)
    private String raza;

    @NotNull(message = "La edad es obligatoria")
    @Column(nullable = false)
    private Integer edad;

    @NotNull(message = "El peso es obligatorio")
    @Column(nullable = false)
    private Integer peso;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    @JsonIgnore
    private Cliente cliente;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "alimentacion_id", referencedColumnName = "id")
    private Alimentacion alimentacion;
    
}
