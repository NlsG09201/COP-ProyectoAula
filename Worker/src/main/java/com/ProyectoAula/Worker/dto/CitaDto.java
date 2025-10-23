package com.ProyectoAula.Worker.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record CitaDto(
        Long idCita,
        LocalDate fecha,
        LocalTime hora,
        String direccion,
        PacienteDto paciente,
        MedicoDto medico,
        List<ServicioDto> servicios
) {}