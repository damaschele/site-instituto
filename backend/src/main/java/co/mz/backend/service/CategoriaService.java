package co.mz.backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.mz.backend.model.CategoriaModel;
import co.mz.backend.repository.CategoriaRepository;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<CategoriaModel> listarTodas() {
        return categoriaRepository.findAll();
    }

    public CategoriaModel salvar(CategoriaModel categoria) {
        return categoriaRepository.save(categoria);
    }
}
