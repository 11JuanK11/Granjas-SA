package com.example.granjasa.Service.Implement;

import java.util.List;

import com.example.granjasa.Entity.Porcino;
import com.example.granjasa.Service.IPorcinoService;

import jakarta.persistence.EntityNotFoundException;

public class PorcinoService implements IPorcinoService{

    @Override
    public Porcino crearPorcino(Porcino porcino, int idCliente) throws EntityNotFoundException {
        throw new UnsupportedOperationException("Unimplemented method 'crearPorcino'");
    }

    @Override
    public List<Porcino> obtenerPorcinos(int idCliente) throws EntityNotFoundException {
        throw new UnsupportedOperationException("Unimplemented method 'obtenerPorcinos'");
    }

    @Override
    public Porcino obtenerPorcinoPorId(String idPorcino) throws EntityNotFoundException {
        throw new UnsupportedOperationException("Unimplemented method 'obtenerPorcinoPorId'");
    }

    @Override
    public Porcino actualizarPorcino(String idPorcino, Porcino porcino) throws EntityNotFoundException {
        throw new UnsupportedOperationException("Unimplemented method 'actualizarPorcino'");
    }

    @Override
    public void eliminarPorcino(String idPorcino) throws EntityNotFoundException {
        throw new UnsupportedOperationException("Unimplemented method 'eliminarPorcino'");
    }
    
}
