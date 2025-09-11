package com.example.granjasa.Service.Implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.granjasa.Entity.Cliente;
import com.example.granjasa.Repository.IClienteRepository;
import com.example.granjasa.Service.IClienteService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ClienteService implements IClienteService{

    @Autowired
    private IClienteRepository clienteRepository;

    @Override
    public Cliente crearCliente(Cliente cliente) throws EntityNotFoundException {
        if (cliente == null)
            throw new IllegalArgumentException("El cliente debe tener datos.");

        validarClienteExistente(cliente.getCedula());
        return clienteRepository.save(cliente);
    }

    @Override
    public List<Cliente> obtenerClientes(int idCliente) throws EntityNotFoundException {
        List<Cliente> clientes = clienteRepository.findAll();

        if (clientes.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron clientes.");
        }
        return clientes;
    }

    @Override
    public Cliente obtenerClientePorId(int idCliente) throws EntityNotFoundException {
        Cliente cliente = clienteRepository.findById(idCliente);

        if (cliente == null) {
            throw new EntityNotFoundException("No se encontró el cliente con cédula: " + idCliente);
        }
        return cliente;
    }

    @Override
    public Cliente actualizarCliente(int idCliente, Cliente cliente) throws EntityNotFoundException {
        Cliente clienteExistente = clienteRepository.findById(idCliente);

        if (clienteExistente == null) {
            throw new EntityNotFoundException("No se encontró el cliente con cédula: " + idCliente);
        } else {
            clienteExistente.setNombres(cliente.getNombres());
            clienteExistente.setApellidos(cliente.getApellidos());
            clienteExistente.setDireccion(cliente.getDireccion());
            clienteExistente.setTelefono(cliente.getTelefono());
            return clienteRepository.save(clienteExistente);
        }
    }

    @Override
    public void eliminarCliente(int idCliente) throws EntityNotFoundException {
        if (!clienteRepository.existsById(idCliente)) {
            throw new EntityNotFoundException("No se encontró el cliente con cédula: " + idCliente);
        } else {
            clienteRepository.deleteById(idCliente);
        }
    }

    public void validarClienteExistente(int idCliente) throws IllegalArgumentException {
        boolean clienteExiste = clienteRepository.existsById(idCliente);

        if (clienteExiste) {
            throw new IllegalArgumentException("El cliente ya existe.");
        }
    }

    
}
