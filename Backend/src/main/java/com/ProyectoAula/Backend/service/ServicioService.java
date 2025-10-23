package com.ProyectoAula.Backend.service;

import com.ProyectoAula.Backend.model.Servicio;
import com.ProyectoAula.Backend.repository.ServicioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioService {

    private final ServicioRepository servicioRepository;

    public ServicioService(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    public List<Servicio> findAll() { return servicioRepository.findAll(); }

    public Optional<Servicio> findById(Long id) { return servicioRepository.findById(id); }

    @Transactional
    public Servicio save(Servicio servicio) { return servicioRepository.save(servicio); }

    @Transactional
    public void deleteById(Long id) { servicioRepository.deleteById(id); }

    public Optional<Servicio> findByTipo(String tipo) { return Optional.ofNullable(servicioRepository.findByTipoServicio(tipo)); }

    public List<Servicio> searchByTipo(String texto) { return servicioRepository.findByTipoServicioContainingIgnoreCase(texto); }
}