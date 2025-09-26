package com.example.granjasa.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Cliente> crearCliente(@Argument ClienteInput input) {
        try {
            Cliente clienteNuevo = new Cliente();
            clienteNuevo.setCedula(input.getCedula());
            clienteNuevo.setNombres(input.getNombres());
            clienteNuevo.setApellidos(input.getApellidos());
            clienteNuevo.setDireccion(input.getDireccion());
            clienteNuevo.setTelefono(input.getTelefono());
            
            Cliente cliente = clienteService.crearCliente(clienteNuevo);
            return new ResponseEntity<>(cliente, HttpStatus.CREATED);
            
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @QueryMapping
    public ResponseEntity<List<Cliente>> clientes() {
        try {
            List<Cliente> clientes = clienteService.obtenerClientes();
            return new ResponseEntity<>(clientes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @MutationMapping
    public ResponseEntity<Cliente> actualizarCliente(@Argument ActualizarClienteInput input) {
        try {
            Cliente cliente = new Cliente();
            cliente.setCedula(input.getCedula());
            
            if (input.getNombres() != null) cliente.setNombres(input.getNombres());
            if (input.getApellidos() != null) cliente.setApellidos(input.getApellidos());
            if (input.getDireccion() != null) cliente.setDireccion(input.getDireccion());
            if (input.getTelefono() != null) cliente.setTelefono(input.getTelefono());
            
            Cliente clienteActualizado = clienteService.actualizarCliente(cliente.getCedula(), cliente);
            return ResponseEntity.ok(clienteActualizado);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @MutationMapping
    public ResponseEntity<RespuestaEliminacion> eliminarCliente(@Argument Integer idCliente) {
    try {
        clienteService.eliminarCliente(idCliente);
        return ResponseEntity.ok(new RespuestaEliminacion("Cliente eliminado con éxito", null));
    } catch (Exception e) {
        return ResponseEntity.status(404).body(new RespuestaEliminacion(null, e.getMessage()));
    }
}
}
