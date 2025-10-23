package com.ProyectoAula.Worker.dto;

public record MedicoDto(
        Long idMedico,
        String nombreCompleto,
        String telefono,
        String email,
        String certificado
) {}