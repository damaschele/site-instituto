package co.mz.backend.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import co.mz.backend.model.CategoriaModel;
import co.mz.backend.model.LivrosModelo;
import co.mz.backend.service.LivrosService;


@RestController
@RequestMapping("/api/livros")
@CrossOrigin("*")
public class LivrosController {

    @Autowired
    private LivrosService livrosService;

    @Value("${storage.location}")
    private String storageLocation;

    @GetMapping
    public ResponseEntity<List<LivrosModelo>> listarTodos() {
        List<LivrosModelo> livros = livrosService.listarTodos();
        return ResponseEntity.ok(livros);
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarLivro(
            @RequestParam("titulo") String titulo,
            @RequestParam("descricao") String descricao,
            @RequestParam("foto") MultipartFile foto,
            @RequestParam("livro") MultipartFile livro,
            @RequestParam("categoriaId") Long categoriaId) {
        try {
            livrosService.registrarLivro(titulo, descricao, foto, livro, categoriaId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Livro registrado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao registrar o livro.");
        }
    }

    @GetMapping("/categoria/{id}")
    public ResponseEntity<List<LivrosModelo>> listarPorCategoria(@PathVariable Long id) {
        CategoriaModel categoria = new CategoriaModel();
        categoria.setId(id);
        List<LivrosModelo> livros = livrosService.listarPorCategoria(categoria);
        if (livros.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(livros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivrosModelo> buscarPorId(@PathVariable Long id) {
        Optional<LivrosModelo> livro = livrosService.buscarPorId(id);
        return livro.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<LivrosModelo> salvar(@RequestBody LivrosModelo livro) {
        LivrosModelo livroSalvo = livrosService.salvar(livro);
        return ResponseEntity.status(HttpStatus.CREATED).body(livroSalvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        livrosService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/foto/{filename:.+}")
    public ResponseEntity<Resource> getFoto(@PathVariable String filename) {
        Path file = Paths.get(storageLocation).resolve(filename);
        Resource resource;
        
        try {
            resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                MediaType mediaType;
                String mimeType = Files.probeContentType(file);
                if (mimeType != null) {
                    mediaType = MediaType.parseMediaType(mimeType);
                } else {
                    mediaType = MediaType.APPLICATION_OCTET_STREAM;
                }
                return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/livro/{filename:.+}")
public ResponseEntity<Resource> getLivro(@PathVariable String filename) {
    Path file = Paths.get(storageLocation).resolve(filename); // Caminho do arquivo PDF
    Resource resource;
    
    try {
        resource = new UrlResource(file.toUri());
        if (resource.exists() || resource.isReadable()) {
            MediaType mediaType;
            String mimeType = Files.probeContentType(file);
            if (mimeType != null) {
                mediaType = MediaType.parseMediaType(mimeType);
            } else {
                mediaType = MediaType.APPLICATION_OCTET_STREAM;
            }
            return ResponseEntity.ok()
                .contentType(mediaType)
                .body(resource);
        } else {
            return ResponseEntity.notFound().build(); // Arquivo não encontrado
        }
    } catch (MalformedURLException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Problema com URL do arquivo
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Problema de I/O
    }
}

    @GetMapping("/livros-detalhes/{codigo}")
    public ResponseEntity<LivrosModelo> getLivroDetalhes(@PathVariable Long codigo) {
        LivrosModelo livro = livrosService.findLivroByCodigo(codigo);
        return livro != null ? ResponseEntity.ok(livro) : ResponseEntity.notFound().build();
    }

}
