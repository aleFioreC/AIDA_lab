package dev.unicas.aida.springboot.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;

@Entity
public class News {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idNews;

	@Column(name = "CREATION_DATE")
	private Date creationDate;

	@Lob
	private String file;

	@OneToMany(mappedBy = "news")
	private Set<NewsLang> langs;

	public News() {
	}

	public News(Integer idNews, Date creationDate, String file, Set<NewsLang> langs) {
		super();
		this.idNews = idNews;
		this.creationDate = creationDate;
		this.file = file;
		this.langs = langs;
	}

	public Integer getIdNews() {
		return idNews;
	}

	public void setIdNews(Integer idNews) {
		this.idNews = idNews;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public Set<NewsLang> getLangs() {
		return langs;
	}

	public void setLangs(Set<NewsLang> langs) {
		this.langs = langs;
	}

}