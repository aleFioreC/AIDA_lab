package dev.unicas.aida.springboot.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class NewsLang {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idNewsLang;

	private String title;

	private String description;

	private String language;

	@ManyToOne
	@JoinColumn(name = "id_news", nullable = false)
	@JsonBackReference
	private News news;

	public NewsLang() {
	}

	public NewsLang(Integer idNewsLang, String title, String description, String language, News news) {
		super();
		this.idNewsLang = idNewsLang;
		this.title = title;
		this.description = description;
		this.language = language;
		this.news = news;
	}

	public Integer getIdNewsLang() {
		return idNewsLang;
	}

	public void setIdNewsLang(Integer idNewsLang) {
		this.idNewsLang = idNewsLang;
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

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public News getNews() {
		return news;
	}

	public void setNews(News news) {
		this.news = news;
	}

}