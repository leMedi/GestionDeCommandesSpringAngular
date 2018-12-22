package jee.gi.ensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import jee.gi.ensa.domain.Facture;
import jee.gi.ensa.repository.FactureRepository;
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
 * REST controller for managing Facture.
 */
@RestController
@RequestMapping("/api")
public class FactureResource {

    private final Logger log = LoggerFactory.getLogger(FactureResource.class);

    private static final String ENTITY_NAME = "facture";

    private final FactureRepository factureRepository;

    public FactureResource(FactureRepository factureRepository) {
        this.factureRepository = factureRepository;
    }

    /**
     * POST  /factures : Create a new facture.
     *
     * @param facture the facture to create
     * @return the ResponseEntity with status 201 (Created) and with body the new facture, or with status 400 (Bad Request) if the facture has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/factures")
    @Timed
    public ResponseEntity<Facture> createFacture(@RequestBody Facture facture) throws URISyntaxException {
        log.debug("REST request to save Facture : {}", facture);
        if (facture.getId() != null) {
            throw new BadRequestAlertException("A new facture cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Facture result = factureRepository.save(facture);
        return ResponseEntity.created(new URI("/api/factures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /factures : Updates an existing facture.
     *
     * @param facture the facture to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated facture,
     * or with status 400 (Bad Request) if the facture is not valid,
     * or with status 500 (Internal Server Error) if the facture couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/factures")
    @Timed
    public ResponseEntity<Facture> updateFacture(@RequestBody Facture facture) throws URISyntaxException {
        log.debug("REST request to update Facture : {}", facture);
        if (facture.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Facture result = factureRepository.save(facture);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, facture.getId().toString()))
            .body(result);
    }

    /**
     * GET  /factures : get all the factures.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of factures in body
     */
    @GetMapping("/factures")
    @Timed
    public ResponseEntity<List<Facture>> getAllFactures(Pageable pageable) {
        log.debug("REST request to get a page of Factures");
        Page<Facture> page = factureRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/factures");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /factures/:id : get the "id" facture.
     *
     * @param id the id of the facture to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the facture, or with status 404 (Not Found)
     */
    @GetMapping("/factures/{id}")
    @Timed
    public ResponseEntity<Facture> getFacture(@PathVariable Long id) {
        log.debug("REST request to get Facture : {}", id);
        Optional<Facture> facture = factureRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(facture);
    }

    /**
     * DELETE  /factures/:id : delete the "id" facture.
     *
     * @param id the id of the facture to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/factures/{id}")
    @Timed
    public ResponseEntity<Void> deleteFacture(@PathVariable Long id) {
        log.debug("REST request to delete Facture : {}", id);

        factureRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
