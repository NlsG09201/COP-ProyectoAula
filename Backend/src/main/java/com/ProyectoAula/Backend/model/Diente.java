package com.ProyectoAula.Backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "DIENTES")
@Getter
@Setter
public class Diente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDiente;

    @Column(nullable = false, unique = true)
    private String codigoFDI;  // Código internacional de diente (ej: 11, 12, 21...)

    @Column(nullable = false)
    private String nombre;     // Ejemplo: Incisivo central superior derecho
}
