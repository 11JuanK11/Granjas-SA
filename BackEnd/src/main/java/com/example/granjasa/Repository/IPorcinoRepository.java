package com.example.granjasa.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.granjasa.Entity.Porcino;

@Repository
public interface IPorcinoRepository extends JpaRepository<Porcino, String> {
    
}
