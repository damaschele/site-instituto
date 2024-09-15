package co.mz.backend.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import co.mz.backend.model.CategoriaModel;
import co.mz.backend.model.LivrosModelo;
import co.mz.backend.repository.CategoriaRepository;
import co.mz.backend.repository.LivrosRepository;

@Service
public class LivrosService {

    @Autowired
    private LivrosRepository livrosRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    private static final String UPLOAD_DIR = "uploads"; 
    

    public List<LivrosModelo> listarTodos() {
        return livrosRepository.findAll();
    }

    public List<LivrosModelo> listarPorCategoria(CategoriaModel categoria) {
        return livrosRepository.findByCategoria(categoria);
    }

    public Optional<LivrosModelo> buscarPorId(Long id) {
        return livrosRepository.findById(id);
    }

    public LivrosModelo salvar(LivrosModelo livro) {
        return livrosRepository.save(livro);
    }

    public void deletar(Long id) {
        livrosRepository.deleteById(id);
    }

    public void registrarLivro(String titulo, String descricao, MultipartFile foto, MultipartFile livro, Long categoriaId) throws IOException {
        CategoriaModel categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        LivrosModelo novoLivro = new LivrosModelo();
        novoLivro.setTitulo(titulo);
        novoLivro.setDescricao(descricao);

        // Salvar foto
        String fotoPath = salvarArquivo(foto);
        System.out.println("Foto: "+foto);
        novoLivro.setFoto(fotoPath);

        // Salvar livro
        String livroPath = salvarArquivo(livro);
        novoLivro.setLivro(livroPath);

        novoLivro.setCategoria(categoria);

        livrosRepository.save(novoLivro);
    }

    private String salvarArquivo(MultipartFile arquivo) throws IOException {
        if (arquivo.isEmpty()) {
            return null;
        }

        // Cria diretório de uploads se não existir
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Gera um nome único para o arquivo
        String arquivoNome = System.currentTimeMillis() + "_" + arquivo.getOriginalFilename();
        Path filePath = uploadPath.resolve(arquivoNome);

        // Salva o arquivo no diretório
        try (FileOutputStream fos = new FileOutputStream(filePath.toFile())) {
            fos.write(arquivo.getBytes());
        }

         // Salva o arquivo no diretório
    try (FileOutputStream fos = new FileOutputStream(filePath.toFile())) {
        fos.write(arquivo.getBytes());
    }

    // Construa a URL para acesso
    // Supondo que o diretório de uploads é servido na URL /uploads/
    String fileUrl = arquivoNome;
    System.out.println("Foto: "+fileUrl);
    return fileUrl;
    }

    public LivrosModelo findLivroByCodigo(Long codigo) {
        return livrosRepository.findByCodigo(codigo);
    }
}
