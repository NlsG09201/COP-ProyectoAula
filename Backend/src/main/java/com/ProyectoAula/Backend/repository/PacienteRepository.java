package com.ProyectoAula.Backend.repository;

import com.ProyectoAula.Backend.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    // 🔹 Buscar paciente por documento de identidad
    Optional<Paciente> findByDocIden(String docIden);

    // 🔹 Buscar pacientes cuyo nombre contenga cierto texto (sin importar mayúsculas/minúsculas)
    List<Paciente> findByNombreCompletoContainingIgnoreCase(String nombre);

    // 🔹 Buscar paciente por email exacto
    Paciente findByEmail(String email);
}