package com.ProyectoAula.Backend.controller;

import com.ProyectoAula.Backend.model.Medico;
import com.ProyectoAula.Backend.repository.MedicoRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/medicos")
@CrossOrigin(origins = "*")
public class MedicoController {

    private final MedicoRepository repo;

    public MedicoController(MedicoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Medico> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Medico obtener(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Médico no encontrado"));
    }

    @PostMapping
    public Medico crear(@RequestBody Medico medico) {
        return repo.save(medico);
    }

    @PutMapping("/{id}")
    public Medico actualizar(@PathVariable Long id, @RequestBody Medico datos) {
        Medico m = repo.findById(id).orElseThrow(() -> new RuntimeException("Médico no encontrado"));
        m.setNombreCompleto(datos.getNombreCompleto());
        m.setTelefono(datos.getTelefono());
        m.setEmail(datos.getEmail());
        m.setCertificado(datos.getCertificado());
        return repo.save(m);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repo.deleteById(id);
    }
}