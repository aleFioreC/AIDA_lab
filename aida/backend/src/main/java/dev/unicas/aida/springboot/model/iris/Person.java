package dev.unicas.aida.springboot.model.iris;

public class Person {

	private String lastname;

	private String firstname;

	private String mail;

	private String cf;

	private String id;

	private String idAb;

	private String pid;

	private String idCsa;

	public Person() {
	}

	public Person(String lastname, String firstname, String mail, String cf, String id, String idAb, String pid,
			String idCsa) {
		super();
		this.lastname = lastname;
		this.firstname = firstname;
		this.mail = mail;
		this.cf = cf;
		this.id = id;
		this.idAb = idAb;
		this.pid = pid;
		this.idCsa = idCsa;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getCf() {
		return cf;
	}

	public void setCf(String cf) {
		this.cf = cf;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getIdAb() {
		return idAb;
	}

	public void setIdAb(String idAb) {
		this.idAb = idAb;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getIdCsa() {
		return idCsa;
	}

	public void setIdCsa(String idCsa) {
		this.idCsa = idCsa;
	}

}