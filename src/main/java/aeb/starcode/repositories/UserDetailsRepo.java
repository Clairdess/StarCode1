package aeb.starcode.repositories;

import aeb.starcode.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepo extends JpaRepository<User, String > {
}
