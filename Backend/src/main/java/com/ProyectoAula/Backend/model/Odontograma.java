package com.ProyectoAula.Backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "ODONTOGRAMAS")
@Getter
@Setter
public class Odontograma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOdontograma;

    @Column(nullable = false)
    private LocalDate fechaRegistro;

    @Column(columnDefinition = "TEXT")
    private String observacionesGenerales;

    @ManyToOne
    @JoinColumn(name = "ID_P", nullable = false)
    private Paciente paciente;

    @OneToMany(mappedBy = "odontograma", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleOdontograma> detalles;
}