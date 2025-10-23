package com.ProyectoAula.Worker.dto;

public record PacienteDto(
        Long idP,
        String docIden,
        String nombreCompleto,
        String telefono,
        String email,
        String direccion
) {}