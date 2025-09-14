package com.example.granjasa.Entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "cliente")
public class Cliente implements Serializable {

    @Id
    private Integer cedula;

    @NotNull(message = "Los nombres son obligatorios")
    @Column(nullable = false)
    private String nombres;

    @NotNull(message = "Los apellidos son obligatorios")
    @Column(nullable = false)
    private String apellidos;

    @NotNull(message = "La dirección es obligatoria")
    @Column(nullable = false)
    private String direccion;

    @NotNull(message = "El teléfono es obligatorio")
    @Column(nullable = false)
    private String telefono;

    @OneToMany(mappedBy = "cliente", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private List<Porcino> porcinos = new ArrayList<>();
    
}
