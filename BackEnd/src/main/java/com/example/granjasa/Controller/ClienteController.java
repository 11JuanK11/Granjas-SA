package com.example.granjasa.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.example.granjasa.Dto.ActualizarClienteInput;
import com.example.granjasa.Dto.ClienteInput;
import com.example.granjasa.Dto.RespuestaEliminacion;
import com.example.granjasa.Entity.Cliente;
import com.example.granjasa.Service.Implement.ClienteService;

@Controller
public class ClienteController {
    
    @Autowired
    public ClienteService clienteService;

    @MutationMapping
    public Cliente crearCliente(@Argument ClienteInput input) {

            Cliente clienteNuevo = new Cliente();
            clienteNuevo.setCedula(input.getCedula());
            clienteNuevo.setNombres(input.getNombres());
            clienteNuevo.setApellidos(input.getApellidos());
            clienteNuevo.setDireccion(input.getDireccion());
            clienteNuevo.setTelefono(input.getTelefono());
            
            Cliente cliente = clienteService.crearCliente(clienteNuevo);
            return cliente;
    }

    @QueryMapping
    public List<Cliente> clientes() {
        try {
            List<Cliente> clientes = clienteService.obtenerClientes();
            return clientes;
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener la lista de clientes: " + e.getMessage());
        }
    }

    @MutationMapping
    public Cliente actualizarCliente(@Argument ActualizarClienteInput input) {

            Cliente cliente = new Cliente();
            cliente.setCedula(input.getCedula());
            
            if (input.getNombres() != null) cliente.setNombres(input.getNombres());
            if (input.getApellidos() != null) cliente.setApellidos(input.getApellidos());
            if (input.getDireccion() != null) cliente.setDireccion(input.getDireccion());
            if (input.getTelefono() != null) cliente.setTelefono(input.getTelefono());
            
            Cliente clienteActualizado = clienteService.actualizarCliente(cliente.getCedula(), cliente);
            return clienteActualizado;

    }

    @MutationMapping
    public RespuestaEliminacion eliminarCliente(@Argument Integer idCliente) {

        clienteService.eliminarCliente(idCliente);
        RespuestaEliminacion respuesta = new RespuestaEliminacion("Cliente eliminado con éxito", null);
        return respuesta;
    
    }
}
