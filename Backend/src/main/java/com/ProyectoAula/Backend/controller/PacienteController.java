package com.ProyectoAula.Backend.controller;

import com.ProyectoAula.Backend.model.Paciente;
import com.ProyectoAula.Backend.repository.PacienteRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "*")
public class PacienteController {

    private final PacienteRepository repo;

    public PacienteController(PacienteRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Paciente> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Paciente obtener(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
    }

    @PostMapping
    public Paciente crear(@RequestBody Paciente paciente) {
        return repo.save(paciente);
    }

    @PutMapping("/{id}")
    public Paciente actualizar(@PathVariable Long id, @RequestBody Paciente datos) {
        Paciente p = repo.findById(id).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        p.setNombreCompleto(datos.getNombreCompleto());
        p.setTelefono(datos.getTelefono());
        p.setEmail(datos.getEmail());
        p.setDireccion(datos.getDireccion());
        p.setDocIden(datos.getDocIden());
        return repo.save(p);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repo.deleteById(id);
    }
}