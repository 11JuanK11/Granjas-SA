package com.example.granjasa.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.example.granjasa.Entity.Reporte;
import com.example.granjasa.Service.Implement.ReporteService;

@Controller
public class ReporteController {
    
    @Autowired
    public ReporteService reporteService;

    @QueryMapping
    public ResponseEntity<List<Reporte>> obtener() {
        List<Reporte> reportes = reporteService.generarReporte();
        return new ResponseEntity<>(reportes, HttpStatus.OK);
    }
}
