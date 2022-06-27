package aeb.starcode.Entities;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@ToString
public class Department {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

}
