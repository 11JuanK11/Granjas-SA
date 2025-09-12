package com.example.granjasa.Service;

import java.util.List;

import com.example.granjasa.Entity.Porcino;

import jakarta.persistence.EntityNotFoundException;

public interface IPorcinoService {
    public Porcino crearPorcino(Porcino porcino) throws EntityNotFoundException;
    public List<Porcino> obtenerPorcinosPorCliente(int idCliente) throws EntityNotFoundException;
    public List<Porcino> obtenerPorcinos() throws EntityNotFoundException;
    public Porcino obtenerPorcinoPorId(String idPorcino) throws EntityNotFoundException;
    public Porcino actualizarPorcino(String idPorcino, Porcino porcino) throws EntityNotFoundException;
    public void eliminarPorcino(String idPorcino) throws EntityNotFoundException;
}
