package co.mz.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import co.mz.backend.model.CategoriaModel;
import co.mz.backend.model.LivrosModelo;

@Repository
public interface LivrosRepository extends JpaRepository<LivrosModelo, Long> {
    List<LivrosModelo> findByCategoria(CategoriaModel categoria);
    LivrosModelo findByCodigo(Long codigo);
}
