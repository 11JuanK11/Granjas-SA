package com.example.granjasa.Service.Implement;

import java.util.List;

import com.example.granjasa.Entity.Cliente;
import com.example.granjasa.Service.IClienteService;

import jakarta.persistence.EntityNotFoundException;

public class ClienteService implements IClienteService{

    @Override
    public Cliente crearCliente(Cliente cliente) throws EntityNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'crearCliente'");
    }

    @Override
    public List<Cliente> obtenerClientes(int idCliente) throws EntityNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'obtenerClientes'");
    }

    @Override
    public Cliente obtenerClientePorId(int idCliente) throws EntityNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'obtenerClientePorId'");
    }

    @Override
    public Cliente actualizarCliente(int idCliente, Cliente cliente) throws EntityNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'actualizarCliente'");
    }

    @Override
    public void eliminarCliente(int idCliente) throws EntityNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'eliminarCliente'");
    }
    
}
