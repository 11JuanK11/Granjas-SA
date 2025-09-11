package com.example.granjasa.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.granjasa.Entity.Porcino;

@Repository
public interface IPorcinoRepository extends JpaRepository<Porcino, String> {
    public Optional<Porcino> findById(String idPorcino);
    public void deleteById(String idPorcino);
}
