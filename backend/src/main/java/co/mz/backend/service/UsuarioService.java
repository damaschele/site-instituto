package co.mz.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.mz.backend.model.UsuarioModelo;
import co.mz.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioModelo findByUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    public UsuarioModelo save(UsuarioModelo usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<UsuarioModelo> findAll() {
        return usuarioRepository.findAll();
    }

    public Optional<UsuarioModelo> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    public void delete(UsuarioModelo usuario) {
        usuarioRepository.delete(usuario);
    }
}
