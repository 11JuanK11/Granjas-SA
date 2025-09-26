package com.example.granjasa.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
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
    public List<Porcino> crearListaPorcinos(@Argument List<PorcinoInput> input) {
        try {
            if (input == null || input.isEmpty()) {
                throw new IllegalArgumentException("La lista de porcinos no puede estar vacía");
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

            return porcinosSave;

        }
        catch (Exception e) {
            throw new RuntimeException("Error al crear la lista de porcinos: " + e.getMessage());
        }
    }


    @MutationMapping
    public Porcino crearPorcino(@Argument PorcinoInput input) {
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
            return creado;

        } catch (Exception e) {
            throw new RuntimeException("Error al crear el porcino: " + e.getMessage());
        }
    }

    @QueryMapping
    public List<Porcino> porcinos() {
        try {
            return porcinoService.obtenerPorcinos();
        } catch (Exception e) {
            throw new RuntimeException("Error obtener la lista de porcinos: " + e.getMessage());
        }
    }

    @MutationMapping
    public Porcino actualizarPorcino(@Argument ActualizarPorcinoInput input) {
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
            return actualizado;

        } catch (Exception e) {
            throw new RuntimeException("Error al actualizar el porcino: " + e.getMessage());
        }
    }

    @MutationMapping
    public RespuestaEliminacion eliminarPorcino(@Argument String id) {
        try {
            porcinoService.eliminarPorcino(id);
            RespuestaEliminacion respuesta = new RespuestaEliminacion("Porcino eliminado con éxito", null);
            return respuesta;
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar el porcino: " + e.getMessage());
        }
    }
}
