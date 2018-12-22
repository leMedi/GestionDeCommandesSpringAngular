package jee.gi.ensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import jee.gi.ensa.domain.Produit;
import jee.gi.ensa.repository.ProduitRepository;
import jee.gi.ensa.web.rest.errors.BadRequestAlertException;
import jee.gi.ensa.web.rest.util.HeaderUtil;
import jee.gi.ensa.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Produit.
 */
@RestController
@RequestMapping("/api")
public class ProduitResource {

    private final Logger log = LoggerFactory.getLogger(ProduitResource.class);

    private static final String ENTITY_NAME = "produit";

    private final ProduitRepository produitRepository;

    public ProduitResource(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    /**
     * POST  /produits : Create a new produit.
     *
     * @param produit the produit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new produit, or with status 400 (Bad Request) if the produit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/produits")
    @Timed
    public ResponseEntity<Produit> createProduit(@RequestBody Produit produit) throws URISyntaxException {
        log.debug("REST request to save Produit : {}", produit);
        if (produit.getId() != null) {
            throw new BadRequestAlertException("A new produit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Produit result = produitRepository.save(produit);
        return ResponseEntity.created(new URI("/api/produits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /produits : Updates an existing produit.
     *
     * @param produit the produit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated produit,
     * or with status 400 (Bad Request) if the produit is not valid,
     * or with status 500 (Internal Server Error) if the produit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/produits")
    @Timed
    public ResponseEntity<Produit> updateProduit(@RequestBody Produit produit) throws URISyntaxException {
        log.debug("REST request to update Produit : {}", produit);
        if (produit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Produit result = produitRepository.save(produit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, produit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /produits : get all the produits.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of produits in body
     */
    @GetMapping("/produits")
    @Timed
    public ResponseEntity<List<Produit>> getAllProduits(Pageable pageable) {
        log.debug("REST request to get a page of Produits");
        Page<Produit> page = produitRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/produits");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /produits/:id : get the "id" produit.
     *
     * @param id the id of the produit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the produit, or with status 404 (Not Found)
     */
    @GetMapping("/produits/{id}")
    @Timed
    public ResponseEntity<Produit> getProduit(@PathVariable Long id) {
        log.debug("REST request to get Produit : {}", id);
        Optional<Produit> produit = produitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(produit);
    }

    /**
     * DELETE  /produits/:id : delete the "id" produit.
     *
     * @param id the id of the produit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/produits/{id}")
    @Timed
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        log.debug("REST request to delete Produit : {}", id);

        produitRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
