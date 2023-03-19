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
public class Thesis {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idThesis;

	@Column(name = "CREATION_DATE")
	private Date creationDate;

	@Lob
	private String file;

	@OneToMany(mappedBy = "thesis")
	private Set<ThesisLang> langs;

	public Thesis() {
	}

	public Thesis(Integer idThesis, Date creationDate, String file, Set<ThesisLang> langs) {
		super();
		this.idThesis = idThesis;
		this.creationDate = creationDate;
		this.file = file;
		this.langs = langs;
	}

	public Integer getIdThesis() {
		return idThesis;
	}

	public void setIdThesis(Integer idThesis) {
		this.idThesis = idThesis;
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

	public Set<ThesisLang> getLangs() {
		return langs;
	}

	public void setLangs(Set<ThesisLang> langs) {
		this.langs = langs;
	}

}