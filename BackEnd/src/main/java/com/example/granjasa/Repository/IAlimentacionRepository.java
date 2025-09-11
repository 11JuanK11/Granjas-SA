package com.example.granjasa.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.granjasa.Entity.Alimentacion;

@Repository
public interface IAlimentacionRepository extends JpaRepository<Alimentacion, Integer> {
    public Alimentacion findById(int id);
}
