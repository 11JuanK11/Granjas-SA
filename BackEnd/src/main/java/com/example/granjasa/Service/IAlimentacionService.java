package com.example.granjasa.Service;

import com.example.granjasa.Entity.Alimentacion;

import jakarta.persistence.EntityNotFoundException;

public interface IAlimentacionService {
    public Alimentacion crearAlimentacion(String idPorcino, Alimentacion alimentacion) throws EntityNotFoundException;
    public Alimentacion obtenerAlimentacion(String idPorcino) throws EntityNotFoundException;
    public Alimentacion actualizarAlimentacion(int idAlimentacion, Alimentacion alimentacion) throws EntityNotFoundException;
    public void eliminarAlimentacion(int idAlimentacion) throws EntityNotFoundException;
}
