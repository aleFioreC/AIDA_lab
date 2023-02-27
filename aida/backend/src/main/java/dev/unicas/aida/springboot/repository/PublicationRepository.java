package dev.unicas.aida.springboot.repository;

import org.springframework.data.repository.CrudRepository;

import dev.unicas.aida.springboot.model.Publication;

public interface PublicationRepository extends CrudRepository<Publication, Integer> {


}