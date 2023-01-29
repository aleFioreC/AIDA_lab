package dev.unicas.aida.springboot.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity // This tells Hibernate to make a table out of this class
public class News {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idNews;

	private String title;

	private String description;

	private Date creation_date;

	@Lob
	private String file;

	public News() {
	}

	public News(String title, String description, String file,Date creation_date) {
		super();
		this.title = title;
		this.description = description;
		this.file = file;
		this.creation_date = creation_date;
	}

	public Integer getIdNews() {
		return idNews;
	}

	public void setIdNews(Integer idNews) {
		this.idNews = idNews;
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

	public Date getCreation_date() {
		return creation_date;
	}

	public void setCreation_date(Date creation_date) {
		this.creation_date = creation_date;
	}

}