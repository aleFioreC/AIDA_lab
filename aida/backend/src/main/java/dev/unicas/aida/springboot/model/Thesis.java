package dev.unicas.aida.springboot.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Thesis {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idThesis;

	private String title;

	private String description;

	@Column(name = "CREATION_DATE")
	private Date creationDate;

	@Lob
	private String file;

	public Thesis() {
	}

	public Thesis(String title, String description, String file, Date creation_date) {
		super();
		this.title = title;
		this.description = description;
		this.file = file;
		this.creationDate = creation_date;
	}

	public Integer getIdThesis() {
		return idThesis;
	}

	public void setIdThesis(Integer idThesis) {
		this.idThesis = idThesis;
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

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

}