package com.ProyectoAula.Backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "CITA")
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Cita")
    private Long idCita;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false)
    private LocalTime hora;

    @Column(nullable = false)
    private String direccion;

    // 🔹 Relación con Paciente (Muchas citas pueden tener un paciente)
    @ManyToOne
    @JoinColumn(name = "ID_P", nullable = false)
    private Paciente paciente;

    // 🔹 Relación con Médico (Muchas citas pueden tener un médico)
    @ManyToOne
    @JoinColumn(name = "ID_Medico", nullable = false)
    private Medico medico;

    // 🔹 Relación N:M con Servicio (CITA_SERVICIO)
    @ManyToMany
    @JoinTable(
        name = "CITA_SERVICIO",
        joinColumns = @JoinColumn(name = "ID_Cita"),
        inverseJoinColumns = @JoinColumn(name = "ID_Servicio")
    )
    private List<Servicio> servicios;

    // 🔹 Constructores
    public Cita() {}

    public Cita(LocalDate fecha, LocalTime hora, String direccion, Paciente paciente, Medico medico, List<Servicio> servicios) {
        this.fecha = fecha;
        this.hora = hora;
        this.direccion = direccion;
        this.paciente = paciente;
        this.medico = medico;
        this.servicios = servicios;
    }

    // 🔹 Getters y Setters
    public Long getIdCita() {
        return idCita;
    }

    public void setIdCita(Long idCita) {
        this.idCita = idCita;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Medico getMedico() {
        return medico;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public List<Servicio> getServicios() {
        return servicios;
    }

    public void setServicios(List<Servicio> servicios) {
        this.servicios = servicios;
    }
}
