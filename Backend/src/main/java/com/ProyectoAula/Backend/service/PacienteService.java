package com.ProyectoAula.Backend.service;

import com.ProyectoAula.Backend.model.Paciente;
import com.ProyectoAula.Backend.repository.PacienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public List<Paciente> findAll() { return pacienteRepository.findAll(); }

    public Optional<Paciente> findById(Long id) { return pacienteRepository.findById(id); }

    @Transactional
    public Paciente save(Paciente paciente) { return pacienteRepository.save(paciente); }

    @Transactional
    public void deleteById(Long id) { pacienteRepository.deleteById(id); }

    public Optional<Paciente> findByDocIden(String docIden) { return pacienteRepository.findByDocIden(docIden); }

    public List<Paciente> searchByNombre(String texto) { return pacienteRepository.findByNombreCompletoContainingIgnoreCase(texto); }

    public Optional<Paciente> findByEmail(String email) { return Optional.ofNullable(pacienteRepository.findByEmail(email)); }
}