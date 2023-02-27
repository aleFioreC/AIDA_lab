package dev.unicas.aida.springboot.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Publication {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idPublication;

	private String title;

	private String description;

	private Date creation_date;

	@ManyToOne
	private People people;

	public Publication() {
	}

	public Publication(Integer idPublication, String title, String description, Date creation_date, People people) {
		super();
		this.idPublication = idPublication;
		this.title = title;
		this.description = description;
		this.creation_date = creation_date;
		this.people = people;
	}

	public Integer getIdPublication() {
		return idPublication;
	}

	public void setIdPublication(Integer idPublication) {
		this.idPublication = idPublication;
	}

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
