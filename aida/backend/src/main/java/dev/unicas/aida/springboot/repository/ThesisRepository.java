package dev.unicas.aida.springboot.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import dev.unicas.aida.springboot.model.Thesis;

public interface ThesisRepository extends CrudRepository<Thesis, Integer> {

    public List<Thesis> findAllByOrderByCreationDateDesc();

}