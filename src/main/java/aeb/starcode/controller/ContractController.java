package aeb.starcode.controller;

import aeb.starcode.entities.Contract;
import aeb.starcode.repositories.ContractRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("contract")
public class ContractController {
    private final ContractRepo contractRepo;

    @Autowired
    public ContractController(ContractRepo contractRepo) {
        this.contractRepo = contractRepo;
    }

    @GetMapping
    public List<Contract> list() {
        return contractRepo.findAll();
    }

    @GetMapping("{id}")
    public Contract getOne(@PathVariable("id") Contract contract) {
        return contract;
    }

    @PostMapping
    public Contract create(@RequestBody Contract contract) {
        return contractRepo.save(contract);
    }

    @PutMapping("{id}")
    public Contract update(
            @PathVariable("id") Contract contractFromDB,
            @RequestBody Contract contract
    ) {
        BeanUtils.copyProperties(contract, contractFromDB, "id");
        return contractRepo.save(contractFromDB);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Contract contract) {
        contractRepo.delete(contract);
    }

}
