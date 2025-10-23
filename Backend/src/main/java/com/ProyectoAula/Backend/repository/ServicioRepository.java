package com.ProyectoAula.Backend.repository;

import com.ProyectoAula.Backend.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {

    // 🔹 Buscar servicios por tipo exacto
    Servicio findByTipoServicio(String tipoServicio);

    // 🔹 Buscar servicios que contengan parte del nombre (insensible a mayúsculas/minúsculas)
    List<Servicio> findByTipoServicioContainingIgnoreCase(String tipoServicio);
}
