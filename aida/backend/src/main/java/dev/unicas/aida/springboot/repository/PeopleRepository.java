package dev.unicas.aida.springboot.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import dev.unicas.aida.springboot.model.People;

public interface PeopleRepository extends CrudRepository<People, Integer> {

    public List<People> findAllByOrderByIdPeopleDesc();

}