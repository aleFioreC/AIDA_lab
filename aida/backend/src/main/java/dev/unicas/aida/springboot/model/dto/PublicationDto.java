package dev.unicas.aida.springboot.model.dto;

import java.util.Date;

import dev.unicas.aida.springboot.model.People;

public class PublicationDto {

	private String title;

	private String description;

	private Date creation_date;

	private People people;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreation_date() {
		return creation_date;
	}

	public void setCreation_date(Date creation_date) {
		this.creation_date = creation_date;
	}

	public People getPeople() {
		return people;
	}

	public void setPeople(People people) {
		this.people = people;
	}

}