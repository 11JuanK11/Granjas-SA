package com.example.granjasa.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.granjasa.Entity.Porcino;

@Repository
public interface IPorcinoRepository extends JpaRepository<Porcino, String> {
    public Optional<Porcino> findById(String idPorcino);
    public void deleteById(String idPorcino);

    @Modifying
    @Query("UPDATE Porcino p SET p.cliente = null WHERE p.cliente.cedula = :clienteId")
    void updateClienteToNullByClienteId(@Param("clienteId") Integer clienteId);
}
