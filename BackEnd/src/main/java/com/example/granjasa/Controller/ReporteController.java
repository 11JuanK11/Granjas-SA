package com.example.granjasa.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.example.granjasa.Entity.Reporte;
import com.example.granjasa.Service.Implement.ReporteService;

@Controller
public class ReporteController {
    
    @Autowired
    public ReporteService reporteService;

    @QueryMapping
    public List<Reporte> obtener() {
        List<Reporte> reportes = reporteService.generarReporte();
        return reportes;
    }
}
