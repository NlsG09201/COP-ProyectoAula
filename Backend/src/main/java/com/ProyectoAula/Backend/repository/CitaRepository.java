package com.ProyectoAula.Backend.repository;

import com.ProyectoAula.Backend.model.Cita;
import com.ProyectoAula.Backend.model.Medico;
import com.ProyectoAula.Backend.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {

    // 🔹 Buscar todas las citas de un paciente
    List<Cita> findByPaciente(Paciente paciente);

    // 🔹 Buscar todas las citas de un médico
    List<Cita> findByMedico(Medico medico);

    // 🔹 Buscar citas por fecha
    List<Cita> findByFecha(LocalDate fecha);

    // 🔹 Buscar citas entre dos fechas
    List<Cita> findByFechaBetween(LocalDate inicio, LocalDate fin);
}
