package aeb.starcode.repositories;

import aeb.starcode.Entities.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepo extends JpaRepository<Contract, Long> {
}
