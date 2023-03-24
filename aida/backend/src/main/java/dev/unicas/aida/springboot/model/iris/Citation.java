package dev.unicas.aida.springboot.model.iris;

public class Citation {

	private String isi;

	private String scopus;

	public Citation() {
	}

	public Citation(String isi, String scopus) {
		super();
		this.isi = isi;
		this.scopus = scopus;
	}

	public String getIsi() {
		return isi;
	}

	public void setIsi(String isi) {
		this.isi = isi;
	}

	public String getScopus() {
		return scopus;
	}

	public void setScopus(String scopus) {
		this.scopus = scopus;
	}

}