package com.ProyectoAula.Backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "DETALLE_ODONTOGRAMA")
@Getter
@Setter
public class DetalleOdontograma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetalle;

    @ManyToOne
    @JoinColumn(name = "ID_Odontograma", nullable = false)
    private Odontograma odontograma;

    @ManyToOne
    @JoinColumn(name = "ID_Diente", nullable = false)
    private Diente diente;

    @Column(nullable = false)
    private String estado; // Ejemplo: "Cariado", "Obturado", "Sano", etc.

    @Column(columnDefinition = "TEXT")
    private String observacion;
}