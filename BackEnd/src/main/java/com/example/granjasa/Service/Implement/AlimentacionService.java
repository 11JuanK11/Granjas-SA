package com.example.granjasa.Service.Implement;

import com.example.granjasa.Entity.Alimentacion;
import com.example.granjasa.Service.IAlimentacionService;

import jakarta.persistence.EntityNotFoundException;

public class AlimentacionService implements IAlimentacionService{

    @Override
    public Alimentacion crearAlimentacion(String idPorcino, Alimentacion alimentacion) throws EntityNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'crearAlimentacion'");
    }

    @Override
    public Alimentacion obtenerAlimentacion(String idPorcino) throws EntityNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'obtenerAlimentacion'");
    }

    @Override
    public Alimentacion actualizarAlimentacion(int idAlimentación, Alimentacion alimentacion)
            throws EntityNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'actualizarAlimentacion'");
    }

    @Override
    public void eliminarAlimentacion(int idAlimentacion) throws EntityNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'eliminarAlimentacion'");
    }
    
}
