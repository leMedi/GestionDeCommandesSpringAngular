package jee.gi.ensa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Commande.
 */
@Entity
@Table(name = "commande")
public class Commande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private Instant date;

    @OneToMany(mappedBy = "commande")
    private Set<Facture> factures = new HashSet<>();
    @OneToMany(mappedBy = "commande")
    private Set<Livraison> livraisons = new HashSet<>();
    @ManyToMany
    @JoinTable(name = "commande_produit",
               joinColumns = @JoinColumn(name = "commandes_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "produits_id", referencedColumnName = "id"))
    private Set<Produit> produits = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("commandes")
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Commande date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Set<Facture> getFactures() {
        return factures;
    }

    public Commande factures(Set<Facture> factures) {
        this.factures = factures;
        return this;
    }

    public Commande addFacture(Facture facture) {
        this.factures.add(facture);
        facture.setCommande(this);
        return this;
    }

    public Commande removeFacture(Facture facture) {
        this.factures.remove(facture);
        facture.setCommande(null);
        return this;
    }

    public void setFactures(Set<Facture> factures) {
        this.factures = factures;
    }

    public Set<Livraison> getLivraisons() {
        return livraisons;
    }

    public Commande livraisons(Set<Livraison> livraisons) {
        this.livraisons = livraisons;
        return this;
    }

    public Commande addLivraison(Livraison livraison) {
        this.livraisons.add(livraison);
        livraison.setCommande(this);
        return this;
    }

    public Commande removeLivraison(Livraison livraison) {
        this.livraisons.remove(livraison);
        livraison.setCommande(null);
        return this;
    }

    public void setLivraisons(Set<Livraison> livraisons) {
        this.livraisons = livraisons;
    }

    public Set<Produit> getProduits() {
        return produits;
    }

    public Commande produits(Set<Produit> produits) {
        this.produits = produits;
        return this;
    }

    public Commande addProduit(Produit produit) {
        this.produits.add(produit);
        produit.getCommandes().add(this);
        return this;
    }

    public Commande removeProduit(Produit produit) {
        this.produits.remove(produit);
        produit.getCommandes().remove(this);
        return this;
    }

    public void setProduits(Set<Produit> produits) {
        this.produits = produits;
    }

    public Client getClient() {
        return client;
    }

    public Commande client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
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
        Commande commande = (Commande) o;
        if (commande.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commande.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Commande{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
