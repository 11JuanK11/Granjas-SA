package com.example.granjasa.Service.Implement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.granjasa.Entity.Alimentacion;
import com.example.granjasa.Entity.Cliente;
import com.example.granjasa.Entity.Porcino;
import com.example.granjasa.Repository.IAlimentacionRepository;
import com.example.granjasa.Repository.IClienteRepository;
import com.example.granjasa.Repository.IPorcinoRepository;
import com.example.granjasa.Service.IAlimentacionService;
import com.example.granjasa.Service.IPorcinoService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PorcinoService implements IPorcinoService{

    @Autowired
    private IPorcinoRepository porcinoRepository;

    @Autowired
    private IClienteRepository clienteRepository;

    @Autowired
    private IAlimentacionRepository alimentacionRepository;

    @Autowired
    private IAlimentacionService alimentacionService;

    @Override
    public Porcino crearPorcino(Porcino porcino) throws EntityNotFoundException {
        if (porcino == null)
            throw new IllegalArgumentException("El porcino debe tener datos.");

        validarPorcinoExistente(porcino.getId());
        Alimentacion alimentacion = alimentacionRepository.save(porcino.getAlimentacion());
        porcino.setAlimentacion(alimentacion);
        return porcinoRepository.save(porcino);
    }

    @Override
    public List<Porcino> obtenerPorcinosPorCliente(int idCliente) throws EntityNotFoundException {
        Optional<Cliente> cliente = clienteRepository.findById(idCliente);
        if (!cliente.isPresent()) {
            throw new EntityNotFoundException("No se encontró el cliente con ID: " + idCliente);
        }
        List<Porcino> porcinos = cliente.get().getPorcinos();
        if (porcinos.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron porcinos para el cliente con ID: " + idCliente);
        }
        return porcinos;
    }

    @Override
    public List<Porcino> obtenerPorcinos() throws EntityNotFoundException {
        return porcinoRepository.findAll();
    }

    @Override
    public Porcino obtenerPorcinoPorId(String idPorcino) throws EntityNotFoundException {
        Optional<Porcino> porcino = porcinoRepository.findById(idPorcino);

        if (!porcino.isPresent()) {
            throw new EntityNotFoundException("No se encontró el porcino con ID: " + idPorcino);
        }
        return porcino.get();
    }

    @Override
    public Porcino actualizarPorcino(String idPorcino, Porcino porcino) throws EntityNotFoundException {
        Optional<Porcino> porcinoExistente = porcinoRepository.findById(idPorcino);

        if (porcinoExistente.isEmpty()) {
            throw new EntityNotFoundException("No se encontró el porcino con ID: " + idPorcino);
        } else {
            porcinoExistente.get().setRaza(porcino.getRaza());
            porcinoExistente.get().setEdad(porcino.getEdad());
            porcinoExistente.get().setPeso(porcino.getPeso());;

            Alimentacion alimentacionActualizada = alimentacionService.actualizarAlimentacion(porcinoExistente.get().getAlimentacion().getId(),
            porcino.getAlimentacion());
            porcinoExistente.get().setAlimentacion(alimentacionActualizada);

            porcinoExistente.get().setCliente(porcino.getCliente());

            return porcinoRepository.save(porcinoExistente.get());
        }
    }

    @Override
    public void eliminarPorcino(String idPorcino) throws EntityNotFoundException {
        Optional<Porcino> porcino = porcinoRepository.findById(idPorcino);
        
        if (!porcino.isPresent()) {
            throw new EntityNotFoundException("No se encontró el porcino con ID: " + idPorcino);
        } else {
            porcino.get().setCliente(null);
            porcinoRepository.save(porcino.get());
            porcinoRepository.deleteById(idPorcino);
        }
    }
    
    public void validarPorcinoExistente(String idPorcino) throws IllegalArgumentException {
        boolean porcinoExiste = porcinoRepository.existsById(idPorcino);

        if (porcinoExiste) {
            throw new IllegalArgumentException("El porcino ya existe.");
        }
    }

    
}
