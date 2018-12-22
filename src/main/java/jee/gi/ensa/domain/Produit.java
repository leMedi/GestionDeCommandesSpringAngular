package jee.gi.ensa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Produit.
 */
@Entity
@Table(name = "produit")
public class Produit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "quantite")
    private Long quantite;

    @Column(name = "prix")
    private Double prix;

    @ManyToMany(mappedBy = "produits")
    @JsonIgnore
    private Set<Commande> commandes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Produit nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Long getQuantite() {
        return quantite;
    }

    public Produit quantite(Long quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(Long quantite) {
        this.quantite = quantite;
    }

    public Double getPrix() {
        return prix;
    }

    public Produit prix(Double prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public Set<Commande> getCommandes() {
        return commandes;
    }

    public Produit commandes(Set<Commande> commandes) {
        this.commandes = commandes;
        return this;
    }

    public Produit addCommande(Commande commande) {
        this.commandes.add(commande);
        commande.getProduits().add(this);
        return this;
    }

    public Produit removeCommande(Commande commande) {
        this.commandes.remove(commande);
        commande.getProduits().remove(this);
        return this;
    }

    public void setCommandes(Set<Commande> commandes) {
        this.commandes = commandes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Produit produit = (Produit) o;
        if (produit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), produit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Produit{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", quantite=" + getQuantite() +
            ", prix=" + getPrix() +
            "}";
    }
}
