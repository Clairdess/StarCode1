package aeb.starcode.Entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ContractStatus {
    @Id
    private Long id;
    private String name;
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @ToString.Exclude
    private Contract contract;
}
