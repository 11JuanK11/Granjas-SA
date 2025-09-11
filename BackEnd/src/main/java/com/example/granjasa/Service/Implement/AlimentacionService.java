package com.example.granjasa.Service.Implement;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.granjasa.Entity.Alimentacion;
import com.example.granjasa.Entity.Porcino;
import com.example.granjasa.Repository.IAlimentacionRepository;
import com.example.granjasa.Repository.IPorcinoRepository;
import com.example.granjasa.Service.IAlimentacionService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AlimentacionService implements IAlimentacionService{

    @Autowired
    private IAlimentacionRepository alimentacionRepository;

    @Autowired
    private IPorcinoRepository porcinoRepository;

    @Override
    public Alimentacion crearAlimentacion(String idPorcino, Alimentacion alimentacion) throws EntityNotFoundException {
        if (alimentacion == null)
            throw new IllegalArgumentException("La alimentación debe tener datos.");

        return alimentacionRepository.save(alimentacion);
    }

    @Override
    public Alimentacion obtenerAlimentacion(String idPorcino) throws EntityNotFoundException {
        Optional<Porcino> porcino = porcinoRepository.findById(idPorcino);

        if (!porcino.isPresent()) {
            throw new EntityNotFoundException("No se encontró alimentación.");
        }
        return porcino.get().getAlimentacion();
    }

    @Override
    public Alimentacion actualizarAlimentacion(int idAlimentacion, Alimentacion alimentacion) throws EntityNotFoundException {
        Alimentacion alimentacionExistente = alimentacionRepository.findById(idAlimentacion);

        if (alimentacionExistente == null) {
            throw new EntityNotFoundException("No se encontró la alimentación con ID: " + idAlimentacion);
        } else {
            alimentacionExistente.setDescripcion(alimentacion.getDescripcion());;
            alimentacionExistente.setDosis(alimentacion.getDosis());
            return alimentacionRepository.save(alimentacionExistente);
        }
    }

    @Override
    public void eliminarAlimentacion(int idAlimentacion) throws EntityNotFoundException {
        if (!alimentacionRepository.existsById(idAlimentacion)) {
            throw new EntityNotFoundException("No se encontró la alimentación con ID: " + idAlimentacion);
        } else {
            alimentacionRepository.deleteById(idAlimentacion);
        }
        throw new UnsupportedOperationException("Unimplemented method 'eliminarAlimentacion'");
    }
    
}
