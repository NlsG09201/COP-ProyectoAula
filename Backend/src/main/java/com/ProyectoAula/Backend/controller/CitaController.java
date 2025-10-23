package com.ProyectoAula.Backend.controller;

import com.ProyectoAula.Backend.model.Cita;
import com.ProyectoAula.Backend.model.Medico;
import com.ProyectoAula.Backend.model.Paciente;
import com.ProyectoAula.Backend.model.Servicio;
import com.ProyectoAula.Backend.repository.CitaRepository;
import com.ProyectoAula.Backend.repository.MedicoRepository;
import com.ProyectoAula.Backend.repository.PacienteRepository;
import com.ProyectoAula.Backend.repository.ServicioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "*")
public class CitaController {

    private final CitaRepository citaRepo;
    private final PacienteRepository pacienteRepo;
    private final MedicoRepository medicoRepo;
    private final ServicioRepository servicioRepo;

    public CitaController(CitaRepository citaRepo,
                          PacienteRepository pacienteRepo,
                          MedicoRepository medicoRepo,
                          ServicioRepository servicioRepo) {
        this.citaRepo = citaRepo;
        this.pacienteRepo = pacienteRepo;
        this.medicoRepo = medicoRepo;
        this.servicioRepo = servicioRepo;
    }

    // 🔹 Listar todas las citas
    @GetMapping
    public List<Cita> listar() {
        return citaRepo.findAll();
    }

    // 🔹 Obtener cita por ID
    @GetMapping("/{id}")
    public Cita obtener(@PathVariable Long id) {
        return citaRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
    }

    // 🔹 Crear nueva cita
    @PostMapping
    public Cita crear(@RequestBody Cita cita) {

        // Validar existencia de paciente
        if (cita.getPaciente() != null && cita.getPaciente().getIdP() != null) {
            Paciente paciente = pacienteRepo.findById(cita.getPaciente().getIdP())
                    .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
            cita.setPaciente(paciente);
        }

        // Validar existencia de médico
        if (cita.getMedico() != null && cita.getMedico().getIdMedico() != null) {
            Medico medico = medicoRepo.findById(cita.getMedico().getIdMedico())
                    .orElseThrow(() -> new RuntimeException("Médico no encontrado"));
            cita.setMedico(medico);
        }

        // Validar servicios
        if (cita.getServicios() != null && !cita.getServicios().isEmpty()) {
            List<Servicio> servicios = cita.getServicios().stream()
                    .map(s -> servicioRepo.findById(s.getIdServicio())
                            .orElseThrow(() -> new RuntimeException("Servicio no encontrado")))
                    .toList();
            cita.setServicios(servicios);
        }

        return citaRepo.save(cita);
    }

    // 🔹 Actualizar cita
    @PutMapping("/{id}")
    public Cita actualizar(@PathVariable Long id, @RequestBody Cita datos) {
        Cita c = citaRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        c.setFecha(datos.getFecha());
        c.setHora(datos.getHora());
        c.setDireccion(datos.getDireccion());
        return citaRepo.save(c);
    }

    // 🔹 Eliminar cita
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        citaRepo.deleteById(id);
    }
}
