package com.example.granjasa.Service.Implement;

import java.util.List;
import java.util.Optional;

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

    @Autowired
    private PorcinoService porcinoService;

    @Override
    public Cliente crearCliente(Cliente cliente) throws EntityNotFoundException {
        if (cliente == null)
            throw new IllegalArgumentException("El cliente debe tener datos.");

        validarClienteExistente(cliente.getCedula());
        return clienteRepository.save(cliente);
    }

    @Override
    public List<Cliente> obtenerClientes() throws EntityNotFoundException {
        List<Cliente> clientes = clienteRepository.findAll();

        if (clientes.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron clientes.");
        }
        return clientes;
    }

    @Override
    public Cliente obtenerClientePorId(Integer idCliente) throws EntityNotFoundException {
        Optional<Cliente> cliente = clienteRepository.findById(idCliente);

        if (!cliente.isPresent()) {
            return null;
        }
        return cliente.get();
    }

    @Override
    public Cliente actualizarCliente(Integer idCliente, Cliente cliente) throws EntityNotFoundException {
        Optional<Cliente> clienteExistente = clienteRepository.findById(idCliente);

        if (!clienteExistente.isPresent()) {
            throw new EntityNotFoundException("No se encontró el cliente con cédula: " + idCliente);
        } else {
            clienteExistente.get().setNombres(cliente.getNombres());
            clienteExistente.get().setApellidos(cliente.getApellidos());
            clienteExistente.get().setDireccion(cliente.getDireccion());
            clienteExistente.get().setTelefono(cliente.getTelefono());
            return clienteRepository.save(clienteExistente.get());
        }
    }

    @Override
    public void eliminarCliente(Integer idCliente) throws EntityNotFoundException {
        if (!clienteRepository.existsById(idCliente)) {
            throw new EntityNotFoundException("No se encontró el cliente con cédula: " + idCliente);
        } else {
            porcinoService.obtenerPorcinosPorCliente(idCliente).forEach(porcino -> {
                try {
                    porcino.setCliente(null);
                } catch (EntityNotFoundException e) {
                    throw new RuntimeException(e);
                }
            });
            clienteRepository.deleteById(idCliente);
        }
    }

    public void validarClienteExistente(Integer idCliente) throws IllegalArgumentException {
        boolean clienteExiste = clienteRepository.existsById(idCliente);

        if (clienteExiste) {
            throw new IllegalArgumentException("El cliente ya existe.");
        }
    }

    
}
