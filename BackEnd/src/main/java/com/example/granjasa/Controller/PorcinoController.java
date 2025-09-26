package com.example.granjasa.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.example.granjasa.Dto.ActualizarPorcinoInput;
import com.example.granjasa.Dto.PorcinoInput;
import com.example.granjasa.Dto.RespuestaEliminacion;
import com.example.granjasa.Entity.Alimentacion;
import com.example.granjasa.Entity.Cliente;
import com.example.granjasa.Entity.Porcino;
import com.example.granjasa.Service.Implement.ClienteService;
import com.example.granjasa.Service.Implement.PorcinoService;

@Controller
public class PorcinoController {
    
    @Autowired
    public PorcinoService porcinoService;

    @Autowired
    public ClienteService clienteService;

    @MutationMapping
public ResponseEntity<List<Porcino>> crearListaPorcinos(@Argument List<PorcinoInput> input) {
    try {
        if (input == null || input.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        List<Porcino> porcinosSave = new ArrayList<>();

        for (PorcinoInput porcinoInput : input) {
            Porcino porcino = new Porcino();
            porcino.setId(porcinoInput.getId());
            porcino.setRaza(porcinoInput.getRaza());
            porcino.setEdad(porcinoInput.getEdad());
            porcino.setPeso(porcinoInput.getPeso());

            if (porcinoInput.getClienteCedula() != null) {
                Cliente cliente = clienteService.obtenerClientePorId(porcinoInput.getClienteCedula());
                porcino.setCliente(cliente);
            }

            if (porcinoInput.getAlimentacion() != null) {
                Alimentacion alimentacion = new Alimentacion();
                alimentacion.setDescripcion(porcinoInput.getAlimentacion().getDescripcion());
                alimentacion.setDosis(porcinoInput.getAlimentacion().getDosis());
                porcino.setAlimentacion(alimentacion);
            }

            porcinosSave.add(porcinoService.crearPorcino(porcino));
        }

        return ResponseEntity.ok(porcinosSave);

    } catch (Exception e) {
        return ResponseEntity.internalServerError().build();
    }
}


    @MutationMapping
    public ResponseEntity<Porcino> crearPorcino(@Argument PorcinoInput input) {
        try {
            Cliente cliente = clienteService.obtenerClientePorId(input.getClienteCedula());
            Porcino porcino = new Porcino();
            porcino.setId(input.getId());
            porcino.setRaza(input.getRaza());
            porcino.setEdad(input.getEdad());
            porcino.setPeso(input.getPeso());
            porcino.setCliente(cliente);

            if (input.getAlimentacion() != null) {
                Alimentacion alimentacion = new Alimentacion();
                alimentacion.setDescripcion(input.getAlimentacion().getDescripcion());
                alimentacion.setDosis(input.getAlimentacion().getDosis());
                porcino.setAlimentacion(alimentacion);
            }
            

            Porcino creado = porcinoService.crearPorcino(porcino);
            return ResponseEntity.ok(creado);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @QueryMapping
    public ResponseEntity<List<Porcino>> porcinos() {
        try {
            return ResponseEntity.ok(porcinoService.obtenerPorcinos());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @MutationMapping
    public ResponseEntity<Porcino> actualizarPorcino(@Argument ActualizarPorcinoInput input) {
        try {
            Porcino porcino = porcinoService.obtenerPorcinoPorId(input.getId());

            if (input.getRaza() != null) porcino.setRaza(input.getRaza());
            if (input.getEdad() != null) porcino.setEdad(input.getEdad());
            if (input.getPeso() != null) porcino.setPeso(input.getPeso());
            if (input.getClienteCedula() != null) {
                Cliente cliente = clienteService.obtenerClientePorId(input.getClienteCedula());
                porcino.setCliente(cliente);
            }
            if (input.getAlimentacion() != null) {
                Alimentacion alimentacion = new Alimentacion();
                alimentacion.setDescripcion(input.getAlimentacion().getDescripcion());
                alimentacion.setDosis(input.getAlimentacion().getDosis());
                porcino.setAlimentacion(alimentacion);
            }
            

            Porcino actualizado = porcinoService.actualizarPorcino(input.getId(), porcino);
            return ResponseEntity.ok(actualizado);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @MutationMapping
    public ResponseEntity<RespuestaEliminacion> eliminarPorcino(@Argument String id) {
        try {
            porcinoService.eliminarPorcino(id);
            return ResponseEntity.ok(new RespuestaEliminacion("Porcino eliminado con éxito", null));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new RespuestaEliminacion(null, e.getMessage()));
        }
    }
}
