package co.mz.backend.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import co.mz.backend.model.UsuarioModelo;
import co.mz.backend.service.UsuarioService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UsuarioController {

    private static final String SECRET = "secret";

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioModelo usuario) {
        UsuarioModelo user = usuarioService.findByUsername(usuario.getUsername());
        if (user != null && user.getPassword().equals(usuario.getPassword())) {
            user.setAtivo(true);
            usuarioService.save(user); 

            String role = user.getRole();
            String token = JWT.create()
                    .withSubject(usuario.getUsername())
                    .withClaim("role", role)
                    .withExpiresAt(new Date(System.currentTimeMillis() + 600000)) 
                    .sign(Algorithm.HMAC256(SECRET));

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", role);
            response.put("user", user);

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("Credenciais inválidas.");
    }
@PostMapping("/usuarios")
public ResponseEntity<?> createUsuario(@RequestBody @Valid UsuarioModelo usuario, BindingResult result) {
    if (result.hasErrors()) {
        return ResponseEntity.badRequest().body(result.getAllErrors());
    }

    if (usuarioService.findByUsername(usuario.getUsername()) != null) {
        return ResponseEntity.status(400).body("Usuário já existe.");
    }

    usuarioService.save(usuario);
    return ResponseEntity.ok(usuario);
}


    @GetMapping("/usuarios")
    public ResponseEntity<List<UsuarioModelo>> getAllUsuarios() {
        List<UsuarioModelo> usuarios = usuarioService.findAll();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<?> getUsuarioById(@PathVariable Long id) {
        Optional<UsuarioModelo> usuario = usuarioService.findById(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        }
        return ResponseEntity.status(404).body("Usuário não encontrado.");
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<?> updateUsuario(@PathVariable Long id, @RequestBody UsuarioModelo usuarioDetails) {
        Optional<UsuarioModelo> usuario = usuarioService.findById(id);
        if (usuario.isPresent()) {
            UsuarioModelo user = usuario.get();
            user.setUsername(usuarioDetails.getUsername());
            user.setPassword(usuarioDetails.getPassword());
            user.setRole(usuarioDetails.getRole());
            user.setAtivo(usuarioDetails.isAtivo());
            usuarioService.save(user);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(404).body("Usuário não encontrado.");
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable Long id) {
        Optional<UsuarioModelo> usuario = usuarioService.findById(id);
        if (usuario.isPresent()) {
            usuarioService.delete(usuario.get());
            return ResponseEntity.ok().body("Usuário excluído com sucesso.");
        }
        return ResponseEntity.status(404).body("Usuário não encontrado.");
    }
}
