package com.example.granjasa.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.granjasa.Entity.Cliente;
import com.example.granjasa.Service.Implement.ClienteService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/cliente/")
public class ClienteController {
    
    @Autowired
    public ClienteService clienteService;

    @PostMapping("/clienteNuevo")
    public ResponseEntity<?> insertar(@RequestBody Cliente clienteNuevo) {
        try {
            Cliente cliente = clienteService.crearCliente(clienteNuevo);
            return new ResponseEntity<>(cliente, HttpStatus.CREATED);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>("Se produjo un error al registrar al cliente." + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<Cliente>> obtenerCliente() {
        List<Cliente> clientes = clienteService.obtenerClientes();
        return new ResponseEntity<>(clientes, HttpStatus.OK);
    }

    @PutMapping("/cliente")
    public ResponseEntity<?> actualizarAcutalizar(@RequestBody Cliente cliente) {
        try {
            Cliente clienteActualizado = clienteService.actualizarCliente(cliente.getCedula(), cliente);
            return ResponseEntity.ok(clienteActualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{idCliente}")
    public ResponseEntity<?> eliminar(@PathVariable Integer idCliente) {
        try {
            clienteService.eliminarCliente(idCliente);;
            return ResponseEntity.ok("Cliente eliminado con éxito");
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
