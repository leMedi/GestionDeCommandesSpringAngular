package jee.gi.ensa.web.rest;

import com.codahale.metrics.annotation.Timed;
import jee.gi.ensa.domain.Livraison;
import jee.gi.ensa.repository.LivraisonRepository;
import jee.gi.ensa.web.rest.errors.BadRequestAlertException;
import jee.gi.ensa.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Livraison.
 */
@RestController
@RequestMapping("/api")
public class LivraisonResource {

    private final Logger log = LoggerFactory.getLogger(LivraisonResource.class);

    private static final String ENTITY_NAME = "livraison";

    private final LivraisonRepository livraisonRepository;

    public LivraisonResource(LivraisonRepository livraisonRepository) {
        this.livraisonRepository = livraisonRepository;
    }

    /**
     * POST  /livraisons : Create a new livraison.
     *
     * @param livraison the livraison to create
     * @return the ResponseEntity with status 201 (Created) and with body the new livraison, or with status 400 (Bad Request) if the livraison has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/livraisons")
    @Timed
    public ResponseEntity<Livraison> createLivraison(@RequestBody Livraison livraison) throws URISyntaxException {
        log.debug("REST request to save Livraison : {}", livraison);
        if (livraison.getId() != null) {
            throw new BadRequestAlertException("A new livraison cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Livraison result = livraisonRepository.save(livraison);
        return ResponseEntity.created(new URI("/api/livraisons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /livraisons : Updates an existing livraison.
     *
     * @param livraison the livraison to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated livraison,
     * or with status 400 (Bad Request) if the livraison is not valid,
     * or with status 500 (Internal Server Error) if the livraison couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/livraisons")
    @Timed
    public ResponseEntity<Livraison> updateLivraison(@RequestBody Livraison livraison) throws URISyntaxException {
        log.debug("REST request to update Livraison : {}", livraison);
        if (livraison.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Livraison result = livraisonRepository.save(livraison);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, livraison.getId().toString()))
            .body(result);
    }

    /**
     * GET  /livraisons : get all the livraisons.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of livraisons in body
     */
    @GetMapping("/livraisons")
    @Timed
    public List<Livraison> getAllLivraisons() {
        log.debug("REST request to get all Livraisons");
        return livraisonRepository.findAll();
    }

    /**
     * GET  /livraisons/:id : get the "id" livraison.
     *
     * @param id the id of the livraison to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the livraison, or with status 404 (Not Found)
     */
    @GetMapping("/livraisons/{id}")
    @Timed
    public ResponseEntity<Livraison> getLivraison(@PathVariable Long id) {
        log.debug("REST request to get Livraison : {}", id);
        Optional<Livraison> livraison = livraisonRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(livraison);
    }

    /**
     * DELETE  /livraisons/:id : delete the "id" livraison.
     *
     * @param id the id of the livraison to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/livraisons/{id}")
    @Timed
    public ResponseEntity<Void> deleteLivraison(@PathVariable Long id) {
        log.debug("REST request to delete Livraison : {}", id);

        livraisonRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
