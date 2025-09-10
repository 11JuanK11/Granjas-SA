package com.example.granjasa.Service;

import java.util.List;

import com.example.granjasa.Entity.Cliente;

import jakarta.persistence.EntityNotFoundException;

public interface IClienteService {
    public Cliente crearCliente(Cliente cliente) throws EntityNotFoundException;
    public List<Cliente> obtenerClientes(int idCliente) throws EntityNotFoundException;
    public Cliente obtenerClientePorId(int idCliente) throws EntityNotFoundException;
    public Cliente actualizarCliente(int idCliente, Cliente cliente) throws EntityNotFoundException;
    public void eliminarCliente(int idCliente) throws EntityNotFoundException;
}
