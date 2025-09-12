package com.example.granjasa.Controller;

import java.util.ArrayList;
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

import com.example.granjasa.Entity.Porcino;
import com.example.granjasa.Service.Implement.ClienteService;
import com.example.granjasa.Service.Implement.PorcinoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/porcino")
public class PorcinoController {
    
    @Autowired
    public PorcinoService porcinoService;

    @Autowired
    public ClienteService clientService;

    @PostMapping("/lista")
    public ResponseEntity<?> insertarLista(@RequestBody List<Porcino> porcinos) {
        try {
            if (!porcinos.isEmpty()){
                List<Porcino> porcinosSave = new ArrayList<>();
                for (Porcino porcino : porcinos) {
                    clientService.crearCliente(porcino.getCliente());
                    porcinosSave.add(porcinoService.crearPorcino(porcino));
                    
                }
                return new ResponseEntity<>(porcinosSave, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("La lista de porcinos no puede estar vacía", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>("Se produjo un error al registrar." + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> insertarSolo(@RequestBody Porcino porcino) {
        try {
            if (porcino != null){
                Porcino porcinoSave = porcinoService.crearPorcino(porcino);
                return new ResponseEntity<>(porcinoSave, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("La lista de porcinos no puede estar vacía", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>("Se produjo un error al registrar." + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<Porcino>> obtener() {
        List<Porcino> porcinos = porcinoService.obtenerPorcinos();
        return new ResponseEntity<>(porcinos, HttpStatus.OK);
    }

    @PutMapping("/porcino")
    public ResponseEntity<?> actualizar(@RequestBody Porcino porcino) {
        try {
            Porcino porcinoActualizado = porcinoService.actualizarPorcino(porcino.getId(), porcino);
            return ResponseEntity.ok(porcinoActualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{idPorcino}")
    public ResponseEntity<?> eliminar(@PathVariable String idPorcino) {
        try {
            porcinoService.eliminarPorcino(idPorcino);
            return ResponseEntity.ok("Porcino eliminado con éxito");
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
