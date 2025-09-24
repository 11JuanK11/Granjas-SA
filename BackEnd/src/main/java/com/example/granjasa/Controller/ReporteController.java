package com.example.granjasa.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.granjasa.Entity.Reporte;
import com.example.granjasa.Service.Implement.ReporteService;

@RestController
@RequestMapping("/reporte")
public class ReporteController {
    
    @Autowired
    public ReporteService reporteService;

    @GetMapping("/")
    public ResponseEntity<List<Reporte>> obtener() {
        List<Reporte> reportes = reporteService.generarReporte();
        return new ResponseEntity<>(reportes, HttpStatus.OK);
    }
}
