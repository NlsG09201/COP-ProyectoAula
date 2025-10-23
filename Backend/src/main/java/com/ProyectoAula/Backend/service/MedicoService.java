package com.ProyectoAula.Backend.service;

import com.ProyectoAula.Backend.model.Medico;
import com.ProyectoAula.Backend.repository.MedicoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MedicoService {

    private final MedicoRepository medicoRepository;

    public MedicoService(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    public List<Medico> findAll() { return medicoRepository.findAll(); }

    public Optional<Medico> findById(Long id) { return medicoRepository.findById(id); }

    @Transactional
    public Medico save(Medico medico) { return medicoRepository.save(medico); }

    @Transactional
    public void deleteById(Long id) { medicoRepository.deleteById(id); }

    public List<Medico> searchByNombre(String texto) { return medicoRepository.findByNombreCompletoContainingIgnoreCase(texto); }

    public Optional<Medico> findByEmail(String email) { return Optional.ofNullable(medicoRepository.findByEmail(email)); }

    public List<Medico> searchByCertificado(String certificado) { return medicoRepository.findByCertificadoContainingIgnoreCase(certificado); }
}