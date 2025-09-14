package com.example.granjasa.Service.Implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.granjasa.Entity.Cliente;
import com.example.granjasa.Entity.Porcino;
import com.example.granjasa.Entity.Reporte;

@Service
public class ReporteService {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private PorcinoService porcinoService;
    
    public List<Reporte> generarReporte() {
        List<Cliente> clientes = clienteService.obtenerClientes();
        List<Reporte> reportes = new ArrayList<>();

        for (Cliente cliente : clientes) {
            List<Porcino> porcinos = porcinoService.obtenerPorcinosPorCliente(cliente.getCedula());
            Reporte reporte = new Reporte();
            reporte.setClientes(cliente);
            reporte.setPorcinos(porcinos);
            reportes.add(reporte);
        }
        return reportes;
    }

}
