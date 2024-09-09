package co.mz.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Table(name = "Utilizadores")
@Entity
@Getter
@Setter
public class UsuarioModelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    @NotNull(message = "O email não pode ser nulo")
    private String email;

    @NotNull(message = "O nome de usuário não pode ser nulo")
    private String username;

    @NotNull(message = "A senha não pode ser nula")
    private String password;

    private String role;

    private boolean ativo;
}
