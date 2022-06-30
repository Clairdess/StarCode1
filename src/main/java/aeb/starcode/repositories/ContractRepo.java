package aeb.starcode.repositories;

import aeb.starcode.entities.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepo extends JpaRepository<Contract, Long> {
}
