package com.example.granjasa.Service;

import java.util.List;

import com.example.granjasa.Entity.Cliente;

import jakarta.persistence.EntityNotFoundException;

public interface IClienteService {
    public Cliente crearCliente(Cliente cliente) throws EntityNotFoundException;
    public List<Cliente> obtenerClientes() throws EntityNotFoundException;
    public Cliente obtenerClientePorId(Integer idCliente) throws EntityNotFoundException;
    public Cliente actualizarCliente(Integer idCliente, Cliente cliente) throws EntityNotFoundException;
    public void eliminarCliente(Integer idCliente) throws EntityNotFoundException;
}
