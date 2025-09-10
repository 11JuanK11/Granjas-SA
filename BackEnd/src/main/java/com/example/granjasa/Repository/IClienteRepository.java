package com.example.granjasa.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.granjasa.Entity.Cliente;

@Repository
public interface IClienteRepository extends JpaRepository<Cliente, Integer> {
    
}
