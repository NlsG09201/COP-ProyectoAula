package com.ProyectoAula.Backend.repository;

import com.ProyectoAula.Backend.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {

    // 🔹 Buscar médicos por nombre (ignorando mayúsculas/minúsculas)
    List<Medico> findByNombreCompletoContainingIgnoreCase(String nombre);

    // 🔹 Buscar médico por email exacto
    Medico findByEmail(String email);

    // 🔹 Buscar médicos por número de certificado
    List<Medico> findByCertificadoContainingIgnoreCase(String certificado);
}