package aeb.starcode.Entities;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String secondName;
    private String email;
    private String patronymic;
    private String phoneNumber;
    @OneToMany
    @JoinColumn(name = "person_id")
    @ToString.Exclude
    private Set<Role> roles;
}
